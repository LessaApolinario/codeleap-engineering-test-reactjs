import { AnimatePresence, motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa6"
import { TbTrashXFilled } from "react-icons/tb"
import type { Post } from "../../../core/domain/models/Post"
import type { PostComment } from "../../../core/domain/models/PostComment"
import {
  useDeletePost,
  useEditPost,
  useLikeUnlikePost,
} from "../../contexts/post/hooks"
import {
  usePostCommentsByPostId,
  useRemovePostComment,
} from "../../contexts/post_comment/hooks"
import { DeleteItemAlert } from "./delete-item-alert"
import { EditPostAlert } from "./edit-post-alert"
import { CreatePostCommentForm } from "./post-card/create-post-comment-form"
import { PostComments } from "./post-card/post-commets"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const editPost = useEditPost()
  const deletePost = useDeletePost()
  const likeUnlikePost = useLikeUnlikePost()
  const removePostComment = useRemovePostComment()
  const postCommentsByPostId = usePostCommentsByPostId()
  const commentsEndRef = useRef<HTMLDivElement>(null)
  const [isDeletePostAlertOpen, setIsDeletePostAlertOpen] = useState(false)
  const [isEditPostFormOpen, setIsEditPostFormOpen] = useState(false)
  const [isPostCommentsAreaVisible, setIsPostCommentsAreaVisible] =
    useState(false)

  const postComments = useMemo<PostComment[]>(() => {
    return postCommentsByPostId[post.id] ?? []
  }, [postCommentsByPostId, post.id])

  useEffect(() => {
    if (isPostCommentsAreaVisible) {
      setTimeout(() => {
        commentsEndRef.current?.scrollIntoView({
          behavior: "smooth",
        })
      }, 100)
    }
  }, [isPostCommentsAreaVisible])

  useEffect(() => {
    if (isPostCommentsAreaVisible && postComments.length > 0) {
      commentsEndRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }
  }, [postComments.length])

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

  function handleLikeUnlikePost() {
    likeUnlikePost(post.id)
  }

  function handleTogglePostCommentsArea() {
    setIsPostCommentsAreaVisible(!isPostCommentsAreaVisible)
  }

  async function deleteAllPostComments() {
    const hasPostComments = postComments.length > 0

    if (hasPostComments) {
      const removePostCommentPromises = postComments.map(
        async (postComment) => {
          return await removePostComment(postComment)
        },
      )

      await Promise.allSettled(removePostCommentPromises)
    }
  }

  async function handleDeletePost() {
    await deletePost(post.id)
    await deleteAllPostComments()
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
    <motion.div className="rounded-lg border border-gray-default bg-white">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-[#7695EC] p-4 flex items-center justify-between rounded-t-lg"
      >
        <h2 className="font-bold text-white text-lg sm:text-[22px]">
          {post.title}
        </h2>

        <div className="flex items-center gap-1.5">
          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
            <TbTrashXFilled
              size={25}
              onClick={handleOpenDeletePostAlert}
              className="cursor-pointer text-white"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
            <FaRegEdit
              size={25}
              onClick={handleOpenEditPostAlert}
              className="cursor-pointer text-white"
            />
          </motion.div>
        </div>
      </motion.header>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-normal">@{post.username}</p>
          <p className="text-gray-normal">
            {formatDateTimeToMinutesAgo(post.created_datetime)}
          </p>
        </div>

        <p>{post.content}</p>
      </div>

      <div className="flex items-start gap-3 p-4 border-t border-gray-default">
        <motion.div
          whileTap={{ scale: 0.8 }}
          animate={post.is_liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {post.is_liked ? (
            <FaHeart
              onClick={handleLikeUnlikePost}
              size={25}
              className="text-red-500 cursor-pointer"
            />
          ) : (
            <FaRegHeart
              onClick={handleLikeUnlikePost}
              size={25}
              className="text-gray-normal cursor-pointer"
            />
          )}
        </motion.div>

        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
          <FaComment
            onClick={handleTogglePostCommentsArea}
            size={25}
            className="text-gray-normal cursor-pointer"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isPostCommentsAreaVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CreatePostCommentForm postId={post.id} />
            <div ref={commentsEndRef} />
            <PostComments postId={post.id} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeletePostAlertOpen && (
          <DeleteItemAlert
            onCancel={handleCloseDeletePostAlert}
            onClose={handleDeletePost}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditPostFormOpen && (
          <EditPostAlert
            post={post}
            onCancel={handleCloseEditPostAlert}
            onConfirm={handleEditPost}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
