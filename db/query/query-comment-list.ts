import { prisma } from "@/prisma";
import { Comment } from "@prisma/client";

export type CommentWithUser = Comment & {
    user: {
        name: string | null
        image: string | null
    } | null
}

export async function queryCommentList(postId: string): Promise<CommentWithUser[]> {
    return prisma.comment.findMany({
        where: {
            postId: postId
        },
        include: {
            user: { 
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}