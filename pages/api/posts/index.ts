import type { User, Post, Comment } from 'prisma/prisma-client'
import { serverAuth } from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb'

export type SinglePostData = Post
export type PostWithUserAndComments = Post & {
    user: User;
    comments: Comment[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SinglePostData | PostWithUserAndComments[]>) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end()
    }

    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res)
            const { body } = req.body

            const post = await prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            })

            return res.status(200).json(post)
        }


        if (req.method === 'GET') {
            let posts

            const { userId } = req.query

            if (userId && typeof userId === 'string') {
                posts = await prisma.post.findMany({
                    where: { userId },
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: { createdAt: 'desc' }
                })
            } else {
                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: { createdAt: 'desc' }
                })
            }

            return res.status(200).json(posts)
        }
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}