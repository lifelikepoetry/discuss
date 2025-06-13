'use server'
import { prisma } from "@/prisma";

export async function getPostListAction() {
    try {
        const posts = await prisma.post.findMany();
        return posts;
    } catch (error) {
        return [];
    }
}