import {prisma } from '@/prisma'
import React, { Suspense } from 'react'
import { Post } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Skeleton } from '@heroui/react'
import { sleep } from '@/app/util/sleep'

export default function PostDetailShowWithSuspense({ id }: { id: string }) {
    return <Suspense fallback={<MySkeleton />}><PostDetailShow id={id} /></Suspense>
}

function MySkeleton() {
    return <div>
        <Skeleton className="w-1/5 h-10 rounded-lg"></Skeleton>
        <Skeleton className=" h-52 rounded-lg mt-4"></Skeleton>
    </div>
}

async function PostDetailShow({ id }: { id: string }) {
    await sleep(1000)
    const post: Post | null = await prisma.post.findFirst({
        where: {
            id: id
        }
    })

    if (!post) {
        notFound()
    }

  return (
    <div>
        <h1 className='text-2xl font-bold'>{post.title}</h1>
        <p className='text-s border border-gray-300 rounded-md p-4 mt-4 leading-relaxed dark:border-purple-300'>{post.content}</p>
    </div>
  )
}
