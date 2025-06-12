"use client";
import { Listbox, ListboxItem } from "@heroui/react";
import { PostWithData } from "@/db/query/query-post-list";
import { useRouter } from "next/navigation";

export default function PostList({ list }: { list: PostWithData[] }) {
    const router = useRouter();

    return (
        <div className="w-3/4">
            {list.length > 0 ? <Listbox
                aria-label="Actions"
                itemClasses={{
                    base: "px-5 rounded-medium gap-3 border-small border-default-200 mt-4",
                }}
            >
                {list.map((post) => (
                    <ListboxItem
                        key={post.id}
                        variant="flat"
                        color="secondary"
                        description={<div className="text-xs text-gray-500 whitespace-nowrap mt-2">{post.user.name}</div>}
                        endContent={<div className="text-xs self-end text-gray-500 whitespace-nowrap">{`${post._count.comments} comments`}</div>}
                    onPress={() => router.push(`/topics/${post.topic.name}/posts/${post.id}`)}
                    >
                        <span className="font-bold">{post.title}</span>
                    </ListboxItem>
                ))}
            </Listbox> : <p>Loading...</p>}
        </div>
    );
}
