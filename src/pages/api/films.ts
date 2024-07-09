import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma_client'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { searchString } = req.query;

    const films = await prisma.film.findMany({
        take: 10
    });

    return res.json(films);
}
