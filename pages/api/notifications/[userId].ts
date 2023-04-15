import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import type { Notification } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Notification[]>) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { userId } = req.query
        if (!userId || typeof userId !== 'string') {
            throw new Error("Invalid ID")
        }
        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hasNotification: false
            }
        })

        return res.status(200).json(notifications)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}