import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma_client'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { searchString } = req.query;

    const resp = await prisma.actor.findMany({
        take: 10
    });

    return res.json(resp);
}
