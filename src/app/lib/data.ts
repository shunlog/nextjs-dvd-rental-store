import prisma from './prisma_client'

const actor_api_basePath = "/api/actors"

function origin_plus_path(origin: string, path: string){
    if (!origin) return path;
    return new URL(path, origin).toString();
}

export async function films_filter(search_str: string, origin: string = ""){
    const r = await prisma.film.findMany({
        include: {
            film_actor: {
                select: {
                    actor: {
                        select: {
                            first_name: true,
                            last_name: true,
                            actor_id: true}}}}},
        where: {
            OR: [
                {title: {
                    contains: search_str,
                    mode: "insensitive"}},
                {description: {
                    contains: search_str,
                    mode: "insensitive"}}]}});

    const r2 = r.map((f) => {
        const {film_actor: ls_actors, ...rest_film} = f;
        const ls_actors2 = ls_actors.map((actor_rel) => {
            const {actor} = actor_rel;
            const {actor_id: id, ...rest_actor} = actor;
            const path = actor_api_basePath + '/' + String(id);
            const url = origin_plus_path(origin, path);
            return {id: id, url: url, ...rest_actor};
        })
        return  {actors: ls_actors2, ...rest_film}
    })


    return r2;
}
