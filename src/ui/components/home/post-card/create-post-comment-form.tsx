import { useState, type FormEvent } from "react"
import { UserToPostCommentAuthorMapper } from "../../../../core/mappers/user-to-post-comment-author.mapper"
import messages from "../../../../core/utils/messages"
import { useUser } from "../../../contexts/auth/hooks"
import { useCreatePostComment } from "../../../contexts/post_comment/hooks"
import { useNotification } from "../../../hooks/useNotification"
import { Button } from "../../base/button"

interface CreatePostCommentFormProps {
  postId: number
}

export function CreatePostCommentForm({ postId }: CreatePostCommentFormProps) {
  const [comment, setComment] = useState("")
  const user = useUser()
  const createPostComment = useCreatePostComment()
  const { showErrorNotification } = useNotification()

  function handleCreatePostComment(event: FormEvent) {
    event.preventDefault()

    const isCommentDefined = !comment.length
    if (isCommentDefined) {
      showErrorNotification(messages.commentCannotBeEmptyMessage)
      return
    }

    createPostComment({
      author: UserToPostCommentAuthorMapper.toPostCommentAuthor(user!),
      content: comment,
      post_id: postId,
    })
    setComment("")
  }

  return (
    <form
      onSubmit={handleCreatePostComment}
      className="flex flex-col gap-1.5 mb-4 p-4 border-t border-gray-default"
    >
      <label htmlFor="content-field" className="font-normal text-base">
        Comment
      </label>
      <textarea
        id="content-field"
        className="p-2 rounded-lg border border-gray-default"
        value={comment}
        placeholder="Write a comment..."
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex items-center justify-end">
        <Button type="submit" color="#7695EC" textColor="#fff">
          Send
        </Button>
      </div>
    </form>
  )
}
