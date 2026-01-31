import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { TbTrashXFilled } from "react-icons/tb"
import type { PostComment } from "../../../../core/domain/models/PostComment"
import { UserToPostCommentAuthorMapper } from "../../../../core/mappers/user-to-post-comment-author.mapper"
import { formatDate } from "../../../../core/utils/dates"
import { useEditPostComment } from "../../../contexts/post_comment/hooks"
import { UserAvatar } from "../../auth/user-avatar"
import { EditPostCommentAlert } from "./post-comment-card/edit-post-comment-alert"
import { useUser } from "../../../contexts/auth/hooks"

interface PostCommentCardProps {
  postComment: PostComment
}

export function PostCommentCard({ postComment }: PostCommentCardProps) {
  const user = useUser()
  const editPostComment = useEditPostComment()
  // const removePostComment = useRemovePostComment()
  const [isEditPostCommentAlertOpen, setIsEditPostCommentAlertOpen] =
    useState(false)
  // const [isRemovePostCommentAlertOpen, setIsRemovePostCommentAlertOpen] =
  //   useState(false)

  const wasPostCommentCreatedByCurrentUser = user?.id === postComment.author.id

  function handleOpenEditPostAlert() {
    setIsEditPostCommentAlertOpen(true)
  }

  function handleCloseEditPostAlert() {
    setIsEditPostCommentAlertOpen(false)
  }

  // function handleOpenDeletePostAlert() {
  //   setIsRemovePostCommentAlertOpen(true)
  // }

  // function handleCloseDeletePostAlert() {
  //   setIsRemovePostCommentAlertOpen(false)
  // }

  function handleEditPostComment(comment: string) {
    editPostComment({
      id: postComment.id,
      content: comment,
      author: postComment.author,
      post_id: postComment.post_id,
    })
    handleCloseEditPostAlert()
  }

  return (
    <article className="border-t border-gray-default rounded-lg border border-gray-default p-2">
      <header className="flex items-center justify-start gap-2 mb-2">
        <UserAvatar
          user={UserToPostCommentAuthorMapper.toUser(postComment.author)}
        />
        <span className="text-sm text-gray-normal font-semibold">
          {formatDate(postComment.created_at)}
        </span>

        {wasPostCommentCreatedByCurrentUser && (
          <div className="self-end flex-auto flex items-center justify-end">
            <TbTrashXFilled
              size={25}
              // onClick={handleOpenDeletePostAlert}
              className="cursor-pointer text-gray-normal font-bold"
            />
            <FaRegEdit
              size={25}
              onClick={handleOpenEditPostAlert}
              className="cursor-pointer text-gray-normal font-bold"
            />
          </div>
        )}
      </header>

      <p className="w-full text-base font-semibold text-gray-normal wrap-break-word break-all overflow-hidden">
        {postComment.content}
      </p>

      {isEditPostCommentAlertOpen && (
        <EditPostCommentAlert
          postComment={postComment}
          onCancel={handleCloseEditPostAlert}
          onConfirm={handleEditPostComment}
        />
      )}
    </article>
  )
}
