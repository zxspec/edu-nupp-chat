import busboy from "busboy";

import fs from "node:fs";
import { join } from "node:path";
import crypto from 'node:crypto';

import { serverAuth } from "@/libs/serverAuth";
import { createFileMeta, getUserFiles, getUserSecrets, updateUserSecrets } from "@/libs/userFiles";
import { ENCRYPTION_ALGORITHM, INITIALIZATION_VECTOR, DATAFOLDER } from "@/libs/constants";

import type { NextApiRequest, NextApiResponse } from "next";
import { UserSecrets } from "@/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT' && req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        const { currentUser } = await serverAuth(req, res)
        const secrets = await getUserSecrets(currentUser.id)
        const passphrase = currentUser.hashedPassword

        if (req.method === "GET") {
            const files = await getUserFiles(secrets)
            return res.status(200).json(files)
        }

        if (req.method === "PUT" && passphrase) {
            return uploadFile(req, res, secrets, passphrase);
        }
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end();
    }
}

function uploadFile(req: NextApiRequest, res: NextApiResponse, secrets: UserSecrets, passphrase: string) {
    const bb = busboy({ headers: req.headers });

    bb.on("file", async (_, file, { filename }) => {
        try {
            const { id: fileId, owner, users } = await createFileMeta(filename, secrets.id, secrets.publicKey)
            const encryptedKey = Buffer.from(users[owner], 'hex')
            const fileEncryptionKey = crypto.privateDecrypt({
                key: secrets.privateKey,
                passphrase,
            }, encryptedKey);

            const filePath = join(DATAFOLDER, fileId);
            const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, fileEncryptionKey, INITIALIZATION_VECTOR);
            const stream = fs.createWriteStream(filePath);
            file.pipe(cipher).pipe(stream);

            if (!secrets.files.find(f => f.filePath === filePath)) {
                secrets.files.push({ filePath, filename })
                updateUserSecrets(secrets)
            }
        } catch (e) {
            bb.emit('error', e)
        }
    });

    bb.on("close", () => {
        res.writeHead(200, { Connection: "close" });
        res.end('File uploaded');
    });

    bb.on('error', (err) => {
        console.error('### err: ', err)
        res.status(500).end()
    })

    req.pipe(bb); // TODO check return req.pipe(bb)

    return;
}