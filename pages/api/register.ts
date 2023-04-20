import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb'
import { generateUserKeys, createUserSecrets } from "@/libs/userFiles";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }

    try {
        const { email, username, name, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const { privateKey, publicKey } = generateUserKeys(hashedPassword)

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword,
                publicKey,
            }
        })

        await createUserSecrets(user.id, publicKey, privateKey) // TODO: what i need out?

        return res.status(200).json(user)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}

export default handler