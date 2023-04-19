import fs from "node:fs";
import { join } from "node:path";
import crypto from 'node:crypto';
import { pipeline } from 'node:stream';

import { serverAuth } from "@/libs/serverAuth";
import { deleteUserFile, getFileMeta, getUserSecrets } from "@/libs/userFIles";
import { ENCRYPTION_ALGORITHM, INITIALIZATION_VECTOR, DATAFOLDER } from "@/libs/constants";

import type { NextApiRequest, NextApiResponse } from "next";
import { UserSecrets } from "@/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET' && req.method !== 'DELETE') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        const secrets = await getUserSecrets(currentUser.id)
        const passphrase = currentUser.hashedPassword

        if (req.method === "GET" && passphrase) {
            return getFile(req, res, secrets, passphrase);
        }

        if (req.method === "DELETE" && passphrase) {
            const { fileId } = req.query
            await deleteUserFile(fileId as string, secrets);
            return res.status(200).end();
        }
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
}

async function getFile(req: NextApiRequest, res: NextApiResponse, secrets: UserSecrets, passphrase: string) {
    const { fileId } = req.query;
    if (!fileId || typeof fileId !== 'string') {
        throw new Error("Invalid File ID")
    }
    const currentUserId = secrets.id
    const fileMeta = await getFileMeta(fileId)
    const encryptedKey = Buffer.from(fileMeta.users[currentUserId], 'hex')
    const fileEncryptionKey = crypto.privateDecrypt({
        key: secrets.privateKey,
        passphrase,
    }, encryptedKey);

    const filePath = join(DATAFOLDER, fileId);
    const encryptedFileStream = fs.createReadStream(filePath);

    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, fileEncryptionKey, INITIALIZATION_VECTOR);

    const responseStream = res;

    pipeline(encryptedFileStream, decipher, responseStream, (error) => {
        if (error) {
            console.error('Error getting file:', error);
            res.status(500).end();
        }
    });
}