import type { PostCommentAuthorRequest } from "./post-comment-author-request"

export interface CreatePostCommentRequest {
  content: string
  author: PostCommentAuthorRequest
  post_id: number
}
