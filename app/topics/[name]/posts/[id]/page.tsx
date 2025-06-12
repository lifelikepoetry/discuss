import React from 'react'

export default async function PostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Posts</h1>
      <p>Post ID: {id}</p>
    </div>
  )
}
