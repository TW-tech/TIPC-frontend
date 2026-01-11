import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/partners/[id] - Get a specific partner by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const partner = await prisma.partner.findUnique({
      where: {
        id,
      },
    });

    if (!partner) {
      return NextResponse.json(
        {
          success: false,
          error: 'Partner not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: partner,
    });
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch partner',
      },
      { status: 500 }
    );
  }
}
