import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get a single article by slug with related data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        blocks: {
          orderBy: {
            position: 'asc',
          },
        },
        annotations: {
          orderBy: {
            position: 'asc',
          },
        },
        videos: true,
        podcasts: true,
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

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: 'Article not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch article',
      },
      { status: 500 }
    );
  }
}
