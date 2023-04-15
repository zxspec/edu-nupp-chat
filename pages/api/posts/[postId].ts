import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/prismadb'
import type { Post, User, Comment } from '@prisma/client';


type CommentWithUser = Comment & { user: User }
export type PostWithNestedFields = Post & {
    user: User;
    comments: CommentWithUser[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostWithNestedFields | null>) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    try {
        const { postId } = req.query
        if (!postId || typeof postId !== 'string') {
            throw new Error("Invalid ID")
        }
        const existingPost = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })

        return res.status(200).json(existingPost)
    } catch (err) {
        console.error('### err: ', err)
        return res.status(400).end()
    }
}