import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/books
 * 獲取所有書籍列表
 */
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error('Books fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '書籍列表獲取失敗',
      },
      { status: 500 }
    );
  }
}
