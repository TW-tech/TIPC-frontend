import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/partners
 * 獲取所有合作夥伴列表
 */
export async function GET() {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: partners,
    });
  } catch (error) {
    console.error('Partners fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '合作夥伴列表獲取失敗',
      },
      { status: 500 }
    );
  }
}
