import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa6"
import { TbTrashXFilled } from "react-icons/tb"
import type { Post } from "../../../core/domain/models/Post"
import {
  useDeletePost,
  useEditPost,
  useLikeUnlikePost,
} from "../../contexts/post/hooks"
import { DeletePostAlert } from "./delete-post-alert"
import { EditPostAlert } from "./edit-post-alert"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const deletePost = useDeletePost()
  const editPost = useEditPost()
  const likeUnlikePost = useLikeUnlikePost()
  const [isDeletePostAlertOpen, setIsDeletePostAlertOpen] = useState(false)
  const [isEditPostFormOpen, setIsEditPostFormOpen] = useState(false)

  function formatDateTimeToMinutesAgo(dateTime: string): string {
    if (!dateTime) {
      return ""
    }

    const now = new Date()
    const date = new Date(dateTime)

    const minutesAgo = Math.floor((now.getTime() - date.getTime()) / 60000)
    return minutesAgo <= 0 ? "Just now" : `${minutesAgo} minute ago`
  }

  function handleOpenDeletePostAlert() {
    setIsDeletePostAlertOpen(true)
  }

  function handleCloseDeletePostAlert() {
    setIsDeletePostAlertOpen(false)
  }

  function handleOpenEditPostAlert() {
    setIsEditPostFormOpen(true)
  }

  function handleCloseEditPostAlert() {
    setIsEditPostFormOpen(false)
  }

  function handleDeletePost() {
    deletePost(post.id)
    handleCloseDeletePostAlert()
  }

  function handleEditPost(title: string, content: string) {
    editPost({
      id: post.id,
      title,
      content,
    })
    handleCloseEditPostAlert()
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
            onClick={handleOpenDeletePostAlert}
            className="cursor-pointer text-white"
          />
          <FaRegEdit
            size={25}
            onClick={handleOpenEditPostAlert}
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

      <div className="flex items-start justify-start gap-2 p-4 border-t border-gray-default">
        {post.is_liked ? (
          <FaHeart
            onClick={() => likeUnlikePost(post.id)}
            size={25}
            className="text-red-500 cursor-pointer"
          />
        ) : (
          <FaRegHeart
            onClick={() => likeUnlikePost(post.id)}
            size={25}
            className="text-gray-normal cursor-pointer"
          />
        )}

        <FaComment size={25} className="text-gray-normal cursor-pointer" />
      </div>

      {isDeletePostAlertOpen && (
        <DeletePostAlert
          onCancel={handleCloseDeletePostAlert}
          onClose={handleDeletePost}
        />
      )}

      {isEditPostFormOpen && (
        <EditPostAlert
          post={post}
          onCancel={handleCloseEditPostAlert}
          onConfirm={handleEditPost}
        />
      )}
    </div>
  )
}
