import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma_client'

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams;
    const searchString = searchParams.get('searchString');
    console.log(searchString);

    const resp = await prisma.actor.findMany({
        take: 10
    });

    return NextResponse.json(resp);
}
