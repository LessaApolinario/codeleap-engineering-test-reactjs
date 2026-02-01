import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react"
import {
  useFetchPostCommentsByPostId,
  usePostCommentsByPostId,
} from "../../../contexts/post_comment/hooks"
import { PostCommentCard } from "./post-comment-card"

interface PostCommentsProps {
  postId: number
}

export function PostComments({ postId }: PostCommentsProps) {
  const postCommentsByPostId = usePostCommentsByPostId()
  const fetchPostCommentsByPostId = useFetchPostCommentsByPostId()
  const postComments = postCommentsByPostId[postId] ?? []

  useEffect(() => {
    fetchPostCommentsByPostId(postId)
  }, [])

  return (
    <motion.div layout className="border-t border-gray-default p-4 space-y-4">
      <AnimatePresence mode="popLayout">
        {postComments.map((postComment) => (
          <motion.div
            key={postComment.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <PostCommentCard postComment={postComment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
