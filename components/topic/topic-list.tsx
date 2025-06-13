import Link from 'next/link';
import React from 'react'
import { Badge, Chip } from '@heroui/react';
import { getTopics } from '@/db/query';
import ViewAllTopic from './view-all-topic';

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

export default async function TopicList() {
    const topics = await getTopics();
    return (
        <div className="group w-1/4 rounded-small border-2 flex flex-wrap gap-3 h-fit p-4 dark:border-purple-300 relative">
            {topics.map((topic) => (
                <Badge size='sm' color='secondary' content={topic._count.post} key={topic.id}>
                    <Chip color={colors[Math.floor(Math.random() * colors.length)]}>
                        <Link className='cursor-pointer ' href={`/topics/${topic.name}`} key={topic.id}>

                            {topic.name}

                        </Link>
                    </Chip>
                </Badge>
            ))}
            <ViewAllTopic />
        </div>
    )
}
