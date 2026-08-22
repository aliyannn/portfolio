import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_fallback_key';
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Karachi',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const targetEmail = 'aliyangohar00@outlook.com';
    const emailSubject = `New Portfolio Lead from ${name} - ${subject || 'General Inquiry'}`;

    // 2. Clean Modern Dark HTML Email Template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #090d16; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            .badge { display: inline-block; padding: 4px 12px; background-color: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); color: #22d3ee; font-size: 11px; font-family: monospace; border-radius: 9999px; margin-bottom: 16px; text-transform: uppercase; font-weight: 600; }
            h1 { font-size: 20px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; }
            .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
            .meta-table td { padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .meta-label { color: #9ca3af; font-family: monospace; width: 110px; }
            .meta-value { color: #f3f4f6; font-weight: 600; }
            .message-box { background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-left: 4px solid #06b6d4; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; margin-top: 16px; }
            .footer { margin-top: 28px; pt-16px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 11px; font-family: monospace; color: #6b7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="badge">★ Portfolio Direct Lead</div>
            <h1>New Inquiry from ${name}</h1>
            
            <table class="meta-table">
              <tr>
                <td class="meta-label">SENDER:</td>
                <td class="meta-value">${name}</td>
              </tr>
              <tr>
                <td class="meta-label">EMAIL:</td>
                <td class="meta-value"><a href="mailto:${email}" style="color:#38bdf8; text-decoration:none;">${email}</a></td>
              </tr>
              <tr>
                <td class="meta-label">SUBJECT:</td>
                <td class="meta-value">${subject || 'None Specified'}</td>
              </tr>
              <tr>
                <td class="meta-label">TIMESTAMP:</td>
                <td class="meta-value">${timestamp} (PKT)</td>
              </tr>
            </table>

            <div style="font-size: 12px; font-family: monospace; color: #9ca3af; margin-bottom: 6px;">MESSAGE CONTENT:</div>
            <div class="message-box">${message}</div>

            <div class="footer">
              Sent automatically via Aliyan Gohar Portfolio API Server Route (Resend Engine)
            </div>
          </div>
        </body>
      </html>
    `;

    // 3. Dispatch via Resend SDK if API key is set
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: 'Aliyan Portfolio <onboarding@resend.dev>',
        to: [targetEmail],
        replyTo: email,
        subject: emailSubject,
        html: htmlTemplate,
      });

      if (error) {
        console.error('Resend delivery error:', error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Email sent successfully via Resend!',
        emailId: data?.id,
      });
    }

    // 4. Standalone Fallback Output (Log + 200 OK Response)
    console.log(`[CONTACT_SUBMISSION] To: ${targetEmail} | From: ${name} (${email}) | Subject: ${subject}`);
    
    return NextResponse.json({
      success: true,
      message: 'Email processed successfully! (Configure RESEND_API_KEY in .env.local for live dispatch)',
    });
  } catch (error: any) {
    console.error('Server contact route error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
