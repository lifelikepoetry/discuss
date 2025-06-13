"use server"
import { auth } from "@/auth";
import { z } from "zod"
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type FormState = {
    message: string | null;
    errors: {
        name: string | null;
        description: string | null;
    };
    login: boolean;
};

const formSchema = z.object({
    name: z.string().min(3, { message: '名称不能小于3个字符' }),
    description: z.string().min(3, { message: '描述不能小于3个字符' })
});

export async function createTopic(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    await new Promise(resolve => setTimeout(resolve, 3000));  
    const session = await auth();
    if (!session?.user) {
        return {
            message: '请先登录',
            errors: { name: null, description: null },
            login: false
        };
    }
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    const validatedFields = formSchema.safeParse({ name, description });
    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            message: '表单验证失败',
            errors: {
                name: fieldErrors.name?.join(',') || null,
                description: fieldErrors.description?.join(',') || null
            },
            login: true
        };
    }
    let topic: Topic | null = null;
    try {
        // 这里添加创建话题的逻辑
        topic = await prisma.topic.create({
            data: {
                name,
                description,
                userId: session.user.id!
            }
        })
        
/*         return {
            message: '创建成功',
            errors: { name: null, description: null },
            login: true
        }; */
    } catch (error) {
        return {
            message: '创建失败',
            errors: { name: null, description: null },
            login: true
        };  
    }
    revalidatePath('/');

    redirect(`/topics/${encodeURIComponent(topic.name)}`);

}