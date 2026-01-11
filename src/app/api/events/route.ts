import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/events - Get all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    const events = await prisma.event.findMany({
      orderBy: {
        eventDate: 'desc', // Most recent events first
      },
      ...(limit ? { take: parseInt(limit) } : {}),
      include: {
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch events',
      },
      { status: 500 }
    );
  }
}
