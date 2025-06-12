import { prisma } from "@/prisma";
import { Topic } from '@prisma/client';

type TopicWithCount = Topic & {
    _count: {
        post: number;
    };
};

export const getTopics = async (): Promise<TopicWithCount[]> => {
    const topics = await prisma.topic.findMany({
        include: {
            _count: {
                select: {
                    post: true
                }
            }    
        },
        take: 13
    });
    return topics as unknown as TopicWithCount[];
}