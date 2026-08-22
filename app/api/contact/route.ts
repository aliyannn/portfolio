import { NextResponse } from 'next/server';

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read';
}

// In-memory query store fallback
let CONTACT_QUERIES: ContactQuery[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const queryItem: ContactQuery = {
      id: `query-${Date.now()}`,
      name,
      email,
      subject: subject || 'Portfolio Contact Form Submission',
      message,
      timestamp: new Date().toISOString(),
      status: 'unread',
    };

    CONTACT_QUERIES.unshift(queryItem);

    // Optional webhook forwarding if WEBHOOK_URL or RESEND_API_KEY is configured
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **New Portfolio Inquiry from ${name}** (${email})\n**Subject:** ${queryItem.subject}\n**Message:** ${message}`,
          }),
        });
      } catch (err) {
        console.error('Webhook dispatch failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received successfully!',
      queryId: queryItem.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process inquiry payload.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const adminPin = searchParams.get('pin');
  const expectedPin = process.env.NEXT_PUBLIC_ADMIN_PIN || 'aliyannn03785';

  if (adminPin !== expectedPin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ queries: CONTACT_QUERIES });
}
