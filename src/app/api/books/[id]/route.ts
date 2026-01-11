import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/books/[id]
 * 根據ID獲取單一書籍
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return NextResponse.json(
        {
          success: false,
          error: '找不到此書籍',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Book fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '書籍獲取失敗',
      },
      { status: 500 }
    );
  }
}
