import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'
import {relation_flatten_and_linkify} from '@/app/lib/data'

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams;
    const search_str = searchParams.get('search_string') || '';
    const origin = req.nextUrl.origin;  // http://localhost:3000


    const r = await prisma.film.findMany({
        include: {film_actor: {
            select: {actor: {
                select: {first_name: true,
                         last_name: true,
                         actor_id: true}}}}},
        where: {
            OR: [
                {title: {contains: search_str, mode: "insensitive"}},
                {description: {contains: search_str, mode: "insensitive"}}]}});

    const films = r.map((f) => relation_flatten_and_linkify({
        obj: f,
        rel_table: "film_actor",
        res_obj_field: "actor",
        res_id_field: "actor_id",
        res_name: "actor",
        ls_name: "actors",
        origin: origin}));

    return NextResponse.json(films);
}
