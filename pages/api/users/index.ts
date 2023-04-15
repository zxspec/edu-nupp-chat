import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb'

export type Users = User[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Users>) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return res.status(200).json(users)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
} 