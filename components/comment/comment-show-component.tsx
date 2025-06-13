'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { CommentWithUser } from '@/db/query/query-comment-list'
import dayjs from 'dayjs'
import CreateCommentForm from './create-comment-form'

export default function CommentShowComponent({ comment, postId, childComments }: { comment: CommentWithUser, postId: string, childComments: CommentWithUser[] }) {
    const [replay, setReplay] = useState(false)
    const childComment = childComments.filter((child) => child.parentId === comment.id)
    return (
        <div className={`border border-gray-300 rounded-md p-4 mt-2 dark:border-purple-300 ${comment.parentId ? 'border-dashed' : ''}`}>
            <div className='flex gap-x-4 items-start'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden border border-gray-300'>
                    <Image src={comment?.user?.image || '/iShot.png'} alt='comment' fill style={{ objectFit: 'cover' }} />
                </div>
                <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                        <div className='space-y-2'>
                            <p className='text-sm text-gray-300'>{comment?.user?.name || 'Anonymous'}</p>
                            <p>{comment.content}</p>
                        </div>
                        <div className='flex flex-col items-end gap-y-4'>
                            <span className='text-sm text-gray-500'>{dayjs(comment.createdAt).format('YY/M/D HH:mm')}</span>
                            <span className='text-xs text-gray-500 hover:text-purple-400 cursor-pointer' onClick={() => setReplay(!replay)}>回复</span>
                        </div>
                    </div>
                    {replay && <CreateCommentForm postId={postId} parentId={comment.id} />}
                    <div className='mt-2'>
                        {childComment.map((child) => (
                            <CommentShowComponent key={child.id} comment={child} postId={postId} childComments={childComments} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}