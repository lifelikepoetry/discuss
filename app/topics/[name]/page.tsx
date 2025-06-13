import CreatePost from '@/components/post/create-post';
import PostList from '@/components/post/post-list';
import { queryPostList } from '@/db/query';
import React from 'react'

export default async function TopicsPage({ params }: { params: Promise<{ name: string }> }) {
  let { name } = await params;  // topic name
  name = decodeURIComponent(name)
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Example Post</h1>
        <CreatePost topicName={name} />
      </div>
      <div className="flex">
        <div className="w-3/4">
          <PostList list={await queryPostList(name)} />
        </div>

        <div className="w-1/4 flex flex-col gap-4 items-end">
        </div>
      </div>

    </>
  )
}
