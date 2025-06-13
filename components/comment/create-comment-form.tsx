'use client'
import { Button, Textarea } from '@heroui/react'
import React, { startTransition, useActionState, useEffect, useRef } from 'react'
import { CommentFormState, createComment } from '@/actions/create-comment-action'

const initialState: CommentFormState = {
    message: '',
    errors: {
        content: ''
    },
    success: false
};

export default function CreateCommentForm({ postId, parentId }: { postId: string, parentId?: string }) {

  const [state, formAction, isPending] = useActionState(createComment.bind(null, { postId, parentId }), initialState);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      startTransition(() => formAction(formData));
  }

  return (
      <form noValidate className='space-y-2 mt-2' onSubmit={handleSubmit} ref={formRef}>
        <Textarea 
        isClearable
        placeholder='Enter your comment'
        label='Comment'
        labelPlacement='inside'
        variant='flat'
        isInvalid={!!state.errors.content}
        errorMessage={state.errors.content}
        name='content'
        autoFocus={true}
        className='rounded-sm!'
        />
        {state.message && <p className='text-sm text-green-500'>{state.message}</p>}
        <Button type='submit' color='secondary' variant='ghost' isLoading={isPending}>Create Comment</Button>
      </form>
  )
}
