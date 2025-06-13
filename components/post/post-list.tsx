"use client";
import { Listbox, ListboxItem } from "@heroui/react";
import { PostWithData } from "@/db/query/query-post-list";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchListResult } from "@/db/query/search-list";

export default function PostList({ list }: { list: PostWithData[] | SearchListResult[] }) {
    const router = useRouter();

    return (
        <div className="w-3/4">
            <Listbox
                aria-label="Actions"
                itemClasses={{
                    base: "px-3 rounded-medium gap-3 border-small border-default-200 mt-4 dark:border-purple-300",
                }}
            >
                {list.map((post) => (
                    <ListboxItem
                        key={post.id}
                        variant="flat"  
                        color="secondary"
                        description={<div className="text-xs text-gray-500 whitespace-nowrap mt-2">{post.user?.name}</div>}
                        endContent={<div className="text-xs self-end text-gray-500 whitespace-nowrap">{`${post._count.comments} comments`}</div>}
                        onPress={() => router.push(`/topics/${post.topic?.name}/posts/${post.id}`)}
                        startContent={<div className="w-14 aspect-square relative rounded-full overflow-hidden border border-gray-300">
                                <Image
                              src={post.user?.image || '/iShot.png'}
                              alt="avatar"
                              fill
                              className="object-cover"
                            />
                        </div>}
/*                         startContent={
                            post.user?.image && (
                              <div>
                                <Avatar src={post.user?.image} className="w-10 h-10" />
                              </div>
                            )
                          } */
                              
                    >
                        <span className="font-bold">{post.title}</span>
                    </ListboxItem>
                ))}
            </Listbox>
        </div>
    );
}
