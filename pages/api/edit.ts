import { serverAuth } from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb'



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    if (req.method !== 'PATCH') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        const { name, username, bio, profileImage, coverImage } = req.body
        if (!name || !username) {
            throw new Error('Misisng fields')
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })

        return res.status(200).json(updatedUser)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}