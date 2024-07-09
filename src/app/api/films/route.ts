import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'
import {films_filter} from '@/app/lib/data'

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams;
    const searchString = searchParams.get('search_string') || '';
    console.log(searchString);

    const films = await films_filter(searchString);

    return NextResponse.json(films);
}
