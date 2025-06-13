import PostDetailShowWithSuspense from '@/components/post/post-detail-show';
import CreateCommentForm from '@/components/comment/create-comment-form';
import CommentShow from '@/components/comment/comment-show';
import React from 'react'

export default async function PostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className='space-y-4'>
      <PostDetailShowWithSuspense id={id} />
      <CreateCommentForm postId={id} />
      <CommentShow postId={id} />
    </div>
  )
}
