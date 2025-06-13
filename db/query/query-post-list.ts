import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import { User } from "@prisma/client";

export type PostWithData = Post & {
    topic: {
        name: string;
    };
    user: User;
    _count: {
        comments: number;
    };
};

export async function queryPostList(topicName: string): Promise<PostWithData[]> {
    const posts = await prisma.post.findMany({
        where: {
            topic: {
                name: topicName
            }
        },
        include: {
            topic: {
                select: {
                    name: true
                }
            },
            user: true,
            _count: {
                select: {
                    comments: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return posts as PostWithData[];
}

export async function queryPostListAtHomePage(): Promise<PostWithData[]> {
    const posts = await prisma.post.findMany({
        include: {
            topic: {
                select: {
                    name: true
                }
            },
            user: true,
            _count: {
                select: {
                    comments: true
                }
            }
        },
        orderBy: [
            {
              comments: {
                _count: "desc",
              },
            },
          ],
    });
    return posts as PostWithData[];
}