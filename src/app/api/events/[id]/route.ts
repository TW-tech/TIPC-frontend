import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events/[id]
 * 根據ID獲取單一活動
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const event = await prisma.event.findUnique({
      where: { id },
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
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          error: '找不到此活動',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Event fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '活動獲取失敗',
      },
      { status: 500 }
    );
  }
}
