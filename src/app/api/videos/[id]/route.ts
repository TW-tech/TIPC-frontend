import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/videos/[id]
 * 獲取單個影片詳細資料
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const video = await prisma.video.findUnique({
      where: {
        id,
      },
      include: {
        keyWords: {
          include: {
            keyWord: true,
          },
        },
        nineBlocks: {
          include: {
            nineBlock: true,
          },
        },
        cakeCategory: {
          include: {
            cakeCategory: true,
          },
        },
      },
    });

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          error: 'Video not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error('Video fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '影片獲取失敗',
      },
      { status: 500 }
    );
  }
}
