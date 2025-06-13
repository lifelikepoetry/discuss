'use client'
import { Badge, Chip, Link, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { getAllTopicsAction } from '@/actions';
import { AllTopicWithCount } from '@/actions';

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
export default function ViewAllTopic() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [topics, setTopics] = useState<AllTopicWithCount[]>([]);
    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await getAllTopicsAction();
            setTopics(topics);
        }
        fetchTopics();
    }, [isOpen]);
    return (
        <>
            <span onClick={onOpen} className='cursor-pointer absolute bottom-0 right-2 text-sm hidden group-hover:block text-purple-500'>view all</span>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">All Topics</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-wrap gap-3 p-2'>
                                    {topics.map((topic) => (
                                        <Badge size='sm' color='secondary' content={topic._count.post} key={topic.id}>
                                            <Chip color={colors[Math.floor(Math.random() * colors.length)]}>
                                                <Link className='cursor-pointer text-white' href={`/topics/${topic.name}`} key={topic.id}>

                                                    {topic.name}

                                                </Link>
                                            </Chip>
                                        </Badge>
                                    ))}
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
