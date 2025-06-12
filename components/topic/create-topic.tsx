"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Chip,
} from "@heroui/react";
import { createTopic, FormState } from "@/actions";
import { useActionState, startTransition, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

const initialState: FormState = {
    message: '',
    errors: {
        name: '',
        description: ''
    },
    login: true
};

export default function CreateTopic() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [state, formAction, isPending] = useActionState(createTopic, initialState);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData));
    }


    return (
        <>
            <Button variant="bordered" color="secondary" onPress={onOpen}>Create Topic</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Topic</ModalHeader>
                            <ModalBody>
                                <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <Input
                                        type="text"
                                        label="name"
                                        name="name"
                                        placeholder="Enter topic name"
                                        labelPlacement="outside"
                                        isInvalid={!!state.errors.name}
                                        errorMessage={state.errors.name}
                                    />
                                    <Textarea
                                        label="description"
                                        name="description"
                                        placeholder="Enter topic description"
                                        labelPlacement="outside"
                                        isInvalid={!!state.errors.description}
                                        errorMessage={state.errors.description}
                                    />
                                    {!state.login && (
                                        <Chip className="mx-auto text-center" color="warning">请先登录</Chip>
                                    )}
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            isLoading={isPending}
                                        >
                                            Create
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
