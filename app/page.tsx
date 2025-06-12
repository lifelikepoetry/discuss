import PostList from "@/components/post/post-list"
import CreateTopic from "@/components/topic/create-topic"
import TopicList from "@/components/topic/topic-list"
import { queryPostListAtHomePage } from "@/db/query"

export default async function Page() {
  return (
    <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Discussion Board</h1>
      <CreateTopic />
    </div>
    <div className="flex">
        <div className="w-3/4">
          <PostList list={await queryPostListAtHomePage()} />
        </div>
      <TopicList />
    </div>
   

    <div className="flex flex-wrap border-2 w-1/2 gap-2 justify-between self-start">
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>
      <div className="w-8 bg-teal-400 h-5"></div>

    </div>
    </>
  )
}