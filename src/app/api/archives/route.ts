import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/archives
 * 獲取所有典藏索引列表
 */
export async function GET() {
  try {
    const archives = await prisma.archiveIndex.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: archives,
    });
  } catch (error) {
    console.error('Archives fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '典藏索引列表獲取失敗',
      },
      { status: 500 }
    );
  }
}
