import { prisma } from "@/prisma";
import { Post, User } from "@prisma/client";

export type SearchListResult = {
    topic: {
        name: string | null;
    } | null;
    user: User | null;
    _count: {
        comments: number;
    };
} & Post

export async function searchList(keyword: string): Promise<SearchListResult[]> {
    const posts: SearchListResult[] = await prisma.post.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: keyword,
                    }
                },
                {
                    content: {
                        contains: keyword,
                    }
                }
            ]
        },
        include: {
            _count: {
                select: {
                    comments: true,
                }
            },
            topic: {
                select: {
                    name: true
                }
            },
            user: true,
        }
    })
    return posts;
}