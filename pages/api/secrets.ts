import { getUserSecrets } from "@/libs/userFiles";
import { serverAuth } from "@/libs/serverAuth";
import { UserSecrets } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserSecrets>) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        const secrets = await getUserSecrets(currentUser.id)

        return res.status(200).json(secrets)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
}