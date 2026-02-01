import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { TbTrashXFilled } from "react-icons/tb"
import type { PostComment } from "../../../../core/domain/models/PostComment"
import { UserToPostCommentAuthorMapper } from "../../../../core/mappers/user-to-post-comment-author.mapper"
import { formatDate } from "../../../../core/utils/dates"
import { useUser } from "../../../contexts/auth/hooks"
import {
  useEditPostComment,
  useRemovePostComment,
} from "../../../contexts/post_comment/hooks"
import { UserAvatar } from "../../auth/user-avatar"
import { DeleteItemAlert } from "../delete-item-alert"
import { EditPostCommentAlert } from "./post-comment-card/edit-post-comment-alert"

interface PostCommentCardProps {
  postComment: PostComment
}

export function PostCommentCard({ postComment }: PostCommentCardProps) {
  const user = useUser()
  const editPostComment = useEditPostComment()
  const removePostComment = useRemovePostComment()
  const [isEditPostCommentAlertOpen, setIsEditPostCommentAlertOpen] =
    useState(false)
  const [isRemovePostCommentAlertOpen, setIsRemovePostCommentAlertOpen] =
    useState(false)

  const wasPostCommentCreatedByCurrentUser = user?.id === postComment.author.id

  function handleOpenEditPostAlert() {
    setIsEditPostCommentAlertOpen(true)
  }

  function handleCloseEditPostAlert() {
    setIsEditPostCommentAlertOpen(false)
  }

  function handleOpenDeletePostAlert() {
    setIsRemovePostCommentAlertOpen(true)
  }

  function handleCloseDeletePostAlert() {
    setIsRemovePostCommentAlertOpen(false)
  }

  function handleDeletePostComment() {
    removePostComment(postComment)
    handleCloseDeletePostAlert()
  }

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
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="border-t border-gray-default rounded-lg border border-gray-default p-2"
    >
      <header className="flex items-center justify-start gap-2 mb-2">
        <UserAvatar
          user={UserToPostCommentAuthorMapper.toUser(postComment.author)}
        />

        <span className="text-sm text-gray-normal font-semibold">
          {formatDate(postComment.created_at)}
        </span>

        {wasPostCommentCreatedByCurrentUser && (
          <div className="self-end flex-auto flex items-center justify-end gap-1">
            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <TbTrashXFilled
                size={25}
                onClick={handleOpenDeletePostAlert}
                className="cursor-pointer text-gray-normal font-bold"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
              <FaRegEdit
                size={25}
                onClick={handleOpenEditPostAlert}
                className="cursor-pointer text-gray-normal font-bold"
              />
            </motion.div>
          </div>
        )}
      </header>

      <p className="w-full text-base font-semibold text-gray-normal wrap-break-word break-all overflow-hidden">
        {postComment.content}
      </p>

      <AnimatePresence>
        {isEditPostCommentAlertOpen && (
          <EditPostCommentAlert
            postComment={postComment}
            onCancel={handleCloseEditPostAlert}
            onConfirm={handleEditPostComment}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isRemovePostCommentAlertOpen && (
          <DeleteItemAlert
            onCancel={handleCloseDeletePostAlert}
            onClose={handleDeletePostComment}
            title="Are you sure you want to delete this comment?"
          />
        )}
      </AnimatePresence>
    </motion.article>
  )
}
