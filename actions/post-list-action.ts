'use server'
import { prisma } from "@/prisma";

export async function getPostListAction() {
    try {
        const posts = await prisma.post.findMany();
        console.log(posts, '15616515616165516516156');
        return posts;
    } catch (error) {
        console.error(error);
        return [];
    }
}