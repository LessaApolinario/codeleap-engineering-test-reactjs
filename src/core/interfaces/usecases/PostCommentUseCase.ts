import type { PostComment } from "../../domain/models/PostComment"
import type { CreatePostCommentRequest } from "../../domain/types/request/post_comment/create-post-comment-request"
import type { EditPostCommentRequest } from "../../domain/types/request/post_comment/edit-post-comment-request"
import type { DefaultPostResponse } from "../../domain/types/response/default/DefaultPostResponse"

export interface PostCommentUseCase {
  create(
    postCommentRequest: CreatePostCommentRequest,
  ): Promise<DefaultPostResponse>
  fetchByPostId(postId: number): Promise<PostComment[]>
  edit(postCommentRequest: EditPostCommentRequest): Promise<void>
  remove(id: string): Promise<void>
}
