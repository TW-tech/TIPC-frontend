import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/videos
 * 獲取所有影片列表
 */
export async function GET() {
  try {
    const videos = await prisma.video.findMany({
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
      orderBy: {
        videoDate: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error('Videos fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '影片列表獲取失敗',
      },
      { status: 500 }
    );
  }
}
