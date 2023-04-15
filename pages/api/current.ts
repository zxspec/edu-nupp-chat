import { serverAuth } from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import type { User } from "@prisma/client";
export type CurrentUserData = User

export const handler = async (req: NextApiRequest, res: NextApiResponse<CurrentUserData>) => {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        return res.status(200).json(currentUser)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
}

export default handler