import { serverAuth } from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { generateGroupId, writeGroupData } from "@/libs/groupFiles";
import { GroupInfo } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).end()
    }
    const { currentUser } = await serverAuth(req, res)

    try {
        if (req.method === 'PUT' && currentUser) {

            const newGroupId = generateGroupId()
            const groupData = { ...req.body as GroupInfo, id: newGroupId }
            writeGroupData(groupData)

            return res.status(200).json(groupData)
        }
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}