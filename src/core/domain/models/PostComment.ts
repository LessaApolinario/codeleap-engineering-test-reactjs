import type { PostCommentAuthor } from "./PostCommentAuthor"

export interface PostComment {
  id: string
  content: string
  author: PostCommentAuthor
  post_id: string
  created_at: string
  updated_at: string
}
