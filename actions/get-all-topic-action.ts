'use server'
import { prisma } from "@/prisma";
import { Topic } from '@prisma/client';

export type AllTopicWithCount = Topic & {
    _count: {
        post: number;
    };
};

export const getAllTopicsAction = async (): Promise<AllTopicWithCount[]> => {
    const topics = await prisma.topic.findMany({
        include: {
            _count: {
                select: {
                    post: true
                }
            }    
        },
    });
    return topics as unknown as AllTopicWithCount[];
}