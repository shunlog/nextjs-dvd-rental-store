import prisma from './prisma_client'

export async function films_filter(search_str: string){
    const r = await prisma.film.findMany({
        where: {
            OR: [
                {title: {
                    contains: search_str,
                    mode: "insensitive"}},
                {description: {
                    contains: search_str,
                    mode: "insensitive"}}]}});

    return r;
}
