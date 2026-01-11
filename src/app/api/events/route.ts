import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events
 * 獲取所有活動列表
 */
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        blocks: {
          orderBy: {
            position: 'asc',
          },
        },
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
      orderBy: {
        eventDate: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '活動列表獲取失敗',
      },
      { status: 500 }
    );
  }
}
