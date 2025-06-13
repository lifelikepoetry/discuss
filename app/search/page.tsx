import { searchList } from '@/db/query'
import React from 'react'
import PostList from '@/components/post/post-list'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ keyword: string }> }) {
    const { keyword } = await searchParams
    const posts = await searchList(keyword!)

    return (    
        <div className='w-3/4 mx-auto flex flex-col gap-y-3'>
        <h1 className='text-2xl font-bold text-left mt-4'>{`${posts.length} Search Result`}</h1>
        <PostList list={posts} />
        </div>
    )
}
