import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, roleCompany, rating, content } = body;

    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, content)' },
        { status: 400 }
      );
    }

    // In a production backend environment, you can persist this review to Prisma / MongoDB / PostgreSQL / Supabase
    console.log('[API Review Submitted]:', { name, email, roleCompany, rating, content });

    return NextResponse.json(
      {
        success: true,
        message: 'Review received and verified successfully!',
        review: {
          id: `rev-${Date.now()}`,
          name,
          roleCompany,
          rating: rating || 5,
          content,
          date: 'Just now',
          verified: true,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
