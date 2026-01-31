import type { PostCommentAuthorRequest } from "./post-comment-author-request"

export interface EditPostCommentRequest {
  id: string
  content: string
  author: PostCommentAuthorRequest
  post_id: number
}
