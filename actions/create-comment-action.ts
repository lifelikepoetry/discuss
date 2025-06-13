'use server'
import { z } from "zod";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export type CommentFormState = {
    message: string | null;
    errors: {
        content: string | null;
    };
    success: boolean;
};

const formSchema = z.object({
    content: z.string()
    .min(10, { message: '内容不能小于10个字符' })
    .max(1000, { message: '内容不能大于1000个字符' })
});

export async function createComment(params: { postId: string, parentId?: string }, prevState: CommentFormState, formData: FormData): Promise<CommentFormState> {
    const { postId, parentId } = params;
    const validatedFields = formSchema.safeParse({
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: {
                content: validatedFields.error.flatten().fieldErrors.content?.join(',') || null
            },
            message: 'Missing Fields. Failed to Create Comment.',
            success: false
        };
    }

    let topicName;

    try {
        const session = await auth()
        if (!session?.user) {
            throw new Error('Unauthorized')
        }


        // 写添加评论的逻辑
        await prisma.comment.create({   
            data: {
                content: formData.get('content') as string,
                userId: session.user.id,
                postId: postId,
                parentId: parentId
            }
        })

        // 使用postId查询topicName用于重新验证-刷新页面
        const result = await prisma.post.findFirst({
            where: {
                id: postId
            },
            include: {
                topic: {
                    select: {
                        name: true
                    }
                }
            }
        })

        topicName = result?.topic?.name
        if (!topicName) {
            throw new Error('Topic not found')
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return {
                errors: {
                    content: null
                },
                message: error.message,
                success: false
            }
        }
        return {
            errors: {
                content: null
            },
            message: 'Failed to create comment',
            success: false
        };
    }

    revalidatePath(`/topics/${topicName}/posts/${postId}`)

    return {
        errors: {
            content: null
        },
        message: 'Comment created successfully',
        success: true
    }
}