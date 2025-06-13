'use client'
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Textarea } from "@heroui/react";
import React, { startTransition } from 'react'
import { useActionState } from "react";
import { createPost, PostFormState } from "@/actions";

const initialState: PostFormState = {
    message: '',
    errors: {
        title: '',
        content: ''
    }
};

export default function CreatePost({ topicName }: { topicName: string }) {
    console.log('topicName🚀🚀🚀', topicName);

    const [state, formAction, isPending] = useActionState(createPost, initialState);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        formData.append('topicName', topicName);
        startTransition(() => formAction(formData));
    }

    return (
        <Popover placement="left-start" showArrow={true}>
            <PopoverTrigger>
                <Button variant="bordered" color="secondary">Create Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form className="flex flex-col gap-4 p-4 w-72" noValidate onSubmit={handleSubmit}>
                    <Input
                        isRequired
                        label="title"
                        labelPlacement="outside"
                        name="title"
                        placeholder="Enter post title"
                        type="text"
                        isInvalid={!!state.errors.title}
                        errorMessage={state.errors.title}
                    />
                    <Textarea
                        isRequired
                        label="content"
                        name="content"
                        placeholder="Enter post content"
                        labelPlacement="outside"
                        isInvalid={!!state.errors.content}
                        errorMessage={state.errors.content}
                    />
                    {state.message && <p className="text-sm text-red-500">{state.message}</p>}
                    <div className="flex gap-2">
                        <Button color="primary" type="submit" isLoading={isPending}>
                            Submit
                        </Button>
                        <Button type="reset" variant="flat">
                            Reset
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
