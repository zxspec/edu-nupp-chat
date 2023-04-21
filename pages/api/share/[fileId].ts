import { serverAuth } from "@/libs/serverAuth";
import { getFileShareData, updateFileShareData, getUserSecrets, writeFileMeta } from "@/libs/userFiles";

import type { NextApiRequest, NextApiResponse } from "next";
import { UserSecrets } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET' && req.method !== 'PATCH') {
        return res.status(405).end()
    }

    try {
        const { fileId } = req.query;
        if (!fileId || typeof fileId !== 'string') {
            throw new Error("Invalid File ID")
        }

        const { currentUser } = await serverAuth(req, res)
        const secrets = await getUserSecrets(currentUser.id)
        const passphrase = currentUser.hashedPassword

        if (req.method === "GET" && passphrase) {
            const result = await getFileShareData(fileId);
            return res.status(200).json(result);
        }

        if (req.method === "PATCH" && passphrase) {
            const flieShareData = req.body
            const fileMeta = await updateFileShareData(fileId, flieShareData, secrets, passphrase)
            await writeFileMeta(fileId, fileMeta)
            const result = await getFileShareData(fileId);

            return res.status(200).json(result);
        }

    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
}

