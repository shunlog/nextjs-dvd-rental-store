import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'
import {films_filter} from '@/app/lib/data'

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams;
    const searchString = searchParams.get('search_string') || '';
    const origin = req.nextUrl.origin;  // http://localhost:3000

    const films = await films_filter(searchString, origin);

    return NextResponse.json(films);
}
