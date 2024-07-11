import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'
import {relation_flatten} from '@/app/lib/data'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number }}
) {
    const origin = req.nextUrl.origin;  // http://localhost:3000
    const film_id = Number(params.id);

    const film = await prisma.film.findUnique({
        where: {film_id: film_id},
        include: {film_actor: {
            select: {actor: {
                select: {first_name: true,
                         last_name: true,
                         actor_id: true}}}}}});

    const film2 = relation_flatten({
        obj: film,
        rel_table: "film_actor",
        res_obj_field: "actor",
        res_id_field: "actor_id",
        res_name: "actor",
        ls_name: "actors",
        origin: origin});


    return NextResponse.json(film2);
}
