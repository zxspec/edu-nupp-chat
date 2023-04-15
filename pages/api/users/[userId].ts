import prisma from '@/libs/prismadb'
import { NextApiRequest, NextApiResponse } from "next";

import type { User } from "@prisma/client";

export type SingleUserData = User & { followersCount: number }

export default async function handler(req: NextApiRequest, res: NextApiResponse<SingleUserData>) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { userId } = req.query
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID")
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!existingUser) {
            throw new Error("Invalid ID")
        }

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return res.status(200).json({ ...existingUser, followersCount })
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}