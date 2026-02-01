import { createContext } from "use-context-selector"
import type { PostComment } from "../../../core/domain/models/PostComment"
import type { CreatePostCommentRequest } from "../../../core/domain/types/request/post_comment/create-post-comment-request"
import type { EditPostCommentRequest } from "../../../core/domain/types/request/post_comment/edit-post-comment-request"

interface PostCommentProps {
  postCommentsByPostId: Record<string, PostComment[]>
  createPostComment: (
    postCommentRequest: CreatePostCommentRequest,
  ) => Promise<void>
  fetchPostCommentsByPostId: (postId: number) => Promise<void>
  editPostComment: (postCommentRequest: EditPostCommentRequest) => Promise<void>
  removePostComment: (postComment: PostComment) => Promise<void>
}

export const PostCommentContext = createContext({} as PostCommentProps)
