import Link from 'next/link';
import React from 'react'
import { Badge, Chip } from '@heroui/react';
import { getTopics } from '@/db/query';

const colors = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;

export default async function TopicList() {
    const topics = await getTopics();
    return (
        <div className="w-1/4 rounded-small border-2 flex flex-wrap gap-3 h-fit p-4">
            {topics.map((topic) => (
                <Badge size='sm' color='secondary' content={topic._count.post}>
                    <Chip color={colors[Math.floor(Math.random() * colors.length)]}>
                        <Link className='cursor-pointer ' href={`/topics/${topic.name}`} key={topic.id}>

                            {topic.name}

                        </Link>
                    </Chip>
                </Badge>
            ))}
        </div>
    )
}
