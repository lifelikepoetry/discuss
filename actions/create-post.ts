'use server'
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { Post } from "@prisma/client";

export type PostFormState = {
    message: string | null;
    errors: {
        title: string | null;
        content: string | null;
    };
};

const formSchema = z.object({
    title: z.string().min(3, { message: '标题不能小于3个字符' }),
    content: z.string().min(10, { message: '内容不能小于10个字符' })
});

export async function createPost(prevState: PostFormState, formData: FormData): Promise<PostFormState> {
    const validatedFields = formSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: {
                title: validatedFields.error.flatten().fieldErrors.title?.join(',') || null,
                content: validatedFields.error.flatten().fieldErrors.content?.join(',') || null
            },
            message: 'Missing Fields. Failed to Create Post.'
        };
    }

    let post: Post;

    try {
        const session = await auth()
        if (!session?.user) {
            throw new Error('Unauthorized')
        }

        const topic = await prisma.topic.findFirst({
            where: {
                name: formData.get('topicName') as string
            }
        })

        if (!topic) {
            throw new Error('Topic not found')
        }


        // 写添加帖子的逻辑
        post = await prisma.post.create({
            data: {
                title: formData.get('title') as string,
                content: formData.get('content') as string,
                userId: session.user.id,
                topicId: topic.id
            }
        })
        
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    title: null,
                    content: null
                },
                message: error.message
            }
        }
        return {
            errors: {
                title: null,
                content: null
            },
            message: 'Failed to create post'
        };
    }

    redirect(`/topics/${formData.get('topicName')}/posts/${post.id}`)
}