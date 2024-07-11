import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma_client'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number }}
) {
    const actor_id = Number(params.id);
    const actor = await prisma.actor.findUnique({
        where: {actor_id: actor_id},});

    return NextResponse.json(actor);
}
