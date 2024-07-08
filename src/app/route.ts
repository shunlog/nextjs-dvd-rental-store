import prisma from './lib/prisma_client'

export async function GET() {
    const film = await prisma.film.findUnique({where: {film_id: 1}});

    return Response.json( {film: film});
}
