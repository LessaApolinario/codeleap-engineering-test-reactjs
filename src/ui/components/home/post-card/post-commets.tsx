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
    <div className="border-t border-gray-default p-4 space-y-4">
      {postComments.map((postComment) => (
        <PostCommentCard key={postComment.id} postComment={postComment} />
      ))}
    </div>
  )
}
