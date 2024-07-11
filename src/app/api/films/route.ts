import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'
import { linkify_list } from '../../lib/data';

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams;
    const search_str = searchParams.get('search_string') || '';
    const origin = req.nextUrl.origin;  // http://localhost:3000


    const ls = await prisma.film.findMany({
        select: {
            film_id: true,
            title: true,
            description: true
        },
        where: {
            OR: [
                {title: {contains: search_str, mode: "insensitive"}},
                {description: {contains: search_str, mode: "insensitive"}}]}});


    const ls2 = linkify_list({
        ls: ls,
        res_name: "film",
        id_field: "film_id",
        origin: origin
    })

    return NextResponse.json(ls2);
}
