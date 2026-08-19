import { NextResponse } from 'next/server';

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  isApproved?: boolean;
  isVisible?: boolean;
}

// In-memory global store fallback for serverless environment
let MEMORY_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    role: 'Product Lead',
    company: 'Horizon Media Labs (Austin, TX)',
    avatar: 'MV',
    rating: 5,
    content:
      'Aliyan revamped our client-facing dashboard using Next.js and Tailwind CSS. The sub-second page loads and seamless GitHub API synchronization cut our internal review times in half. Exceptional frontend talent.',
    date: '2 weeks ago',
    verified: true,
    isApproved: true,
    isVisible: true,
  },
  {
    id: 'rev-2',
    name: 'Sarah Jenkins',
    role: 'Operations Director',
    company: 'Nexus Flow Automations (London, UK)',
    avatar: 'SJ',
    rating: 5,
    content:
      'The Make.com booking and scheduling workflows Aliyan built with Google Sheets and automated webhook integrations run flawlessly. Zero drop-off rate since deployment. Highly recommended for automation solutions.',
    date: '1 month ago',
    verified: true,
    isApproved: true,
    isVisible: true,
  },
  {
    id: 'rev-3',
    name: 'Danyal Sheikh',
    role: 'Co-Founder & CTO',
    company: 'Apex Digital (Lahore, PK)',
    avatar: 'DS',
    rating: 5,
    content:
      'Delivered an incredible dark-mode interactive web platform with Three.js graphics and responsive UI components. His ability to balance heavy 3D visuals with zero-lag mobile performance is rare to find.',
    date: '1 month ago',
    verified: true,
    isApproved: true,
    isVisible: true,
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    role: 'Senior Tech Lead',
    company: 'CloudMatrix Solutions (Berlin, DE)',
    avatar: 'ER',
    rating: 5,
    content:
      'Aliyan demonstrated top-tier engineering discipline—clean TypeScript code structure, accessible components, and strict adherence to project deadlines. A true full-stack asset.',
    date: '2 months ago',
    verified: true,
    isApproved: true,
    isVisible: true,
  },
  {
    id: 'rev-5',
    name: 'David K. Chen',
    role: 'Creative Director',
    company: 'Studio Prism (San Francisco, CA)',
    avatar: 'DC',
    rating: 5,
    content:
      'The custom EmailJS form pipelines and dynamic asset uploads integrated into our client portal work seamlessly. Sleek micro-animations and rock-solid reliability.',
    date: '3 months ago',
    verified: true,
    isApproved: true,
    isVisible: true,
  },
];

// GET: Fetch all active & visible reviews (or all if admin header present)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get('admin') === 'true';

  if (isAdmin) {
    return NextResponse.json({ reviews: MEMORY_REVIEWS });
  }

  // Filter for live public feed
  const publicReviews = MEMORY_REVIEWS.filter(
    (r) => r.isVisible !== false && r.isApproved !== false
  );
  return NextResponse.json({ reviews: publicReviews });
}

// POST: Add new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, company, avatar, rating, content } = body;

    if (!name || !content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    }

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name,
      role: role || 'Client',
      company: company || 'Verified Stakeholder',
      avatar: avatar || name.slice(0, 2).toUpperCase(),
      rating: rating || 5,
      content,
      date: 'Just now',
      verified: true,
      isApproved: true,
      isVisible: true,
    };

    MEMORY_REVIEWS.unshift(newReview);
    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

// DELETE: Delete review by ID (Protected by PIN)
export async function DELETE(request: Request) {
  try {
    const pinHeader = request.headers.get('x-admin-pin');
    const expectedPin = process.env.NEXT_PUBLIC_ADMIN_PIN || 'admin123';

    if (pinHeader !== expectedPin) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    MEMORY_REVIEWS = MEMORY_REVIEWS.filter((r) => r.id !== id);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PATCH: Toggle review visibility or approval (Protected by PIN)
export async function PATCH(request: Request) {
  try {
    const pinHeader = request.headers.get('x-admin-pin');
    const expectedPin = process.env.NEXT_PUBLIC_ADMIN_PIN || 'admin123';

    if (pinHeader !== expectedPin) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const body = await request.json();
    const { id, isVisible, isApproved } = body;

    const target = MEMORY_REVIEWS.find((r) => r.id === id);
    if (!target) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (typeof isVisible === 'boolean') target.isVisible = isVisible;
    if (typeof isApproved === 'boolean') target.isApproved = isApproved;

    return NextResponse.json({ success: true, review: target });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
