import { FaRegEdit } from "react-icons/fa"
import { TbTrashXFilled } from "react-icons/tb"
import type { Post } from "../../../types/Post"

interface PostCardProps {
  post: Post
  onEditPost: () => void
  onDeletePost: () => void
}

export function PostCard({ post, onEditPost, onDeletePost }: PostCardProps) {
  function formatDateTimeToMinutesAgo(dateTime: string): string {
    if (!dateTime) {
      return ""
    }

    const now = new Date()
    const date = new Date(dateTime)

    const minutesAgo = Math.floor((now.getTime() - date.getTime()) / 60000)
    return `${minutesAgo} minutes ago`
  }

  return (
    <div className="rounded-lg border border-gray-default">
      <header className="bg-[#7695EC] p-4 flex items-center justify-between rounded-t-lg">
        <h2 className="font-bold text-white text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px]">
          {post.title}
        </h2>

        <div className="flex items-center justify-center gap-1.5">
          <TbTrashXFilled
            size={25}
            onClick={onDeletePost}
            className="cursor-pointer text-white"
          />
          <FaRegEdit
            size={25}
            onClick={onEditPost}
            className="cursor-pointer text-white"
          />
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-normal">@{post.username}</p>
          <p className="text-gray-normal">
            {formatDateTimeToMinutesAgo(post.created_datetime)}
          </p>
        </div>

        <p>{post.content}</p>
      </div>
    </div>
  )
}
