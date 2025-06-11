import { Button } from "@heroui/react"
import CreateTopic from "@/components/client/create-topic"

export default function Page() {
  return (
    <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Discussion Board</h1>
      <CreateTopic />
    </div>
    <div className="flex">
        <ul className="flex flex-col gap-4 w-3/4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>

      <div className="w-1/4 flex flex-col gap-4 items-end">
        标签区域
      </div>
    </div>

    </>
  )
}