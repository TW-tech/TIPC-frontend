import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/archives/[id]
 * 根據ID獲取單一典藏索引
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const archive = await prisma.archiveIndex.findUnique({
      where: { id: parseInt(id) },
    });

    if (!archive) {
      return NextResponse.json(
        {
          success: false,
          error: '找不到此典藏索引',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: archive,
    });
  } catch (error) {
    console.error('Archive fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引獲取失敗',
      },
      { status: 500 }
    );
  }
}
