import type { PostComment } from "../domain/models/PostComment"
import type { CreatePostCommentRequest } from "../domain/types/request/post_comment/create-post-comment-request"
import type { EditPostCommentRequest } from "../domain/types/request/post_comment/edit-post-comment-request"
import type { DefaultPostResponse } from "../domain/types/response/default/DefaultPostResponse"
import type { PostCommentRepository } from "../interfaces/repositories/PostCommentRepository"
import type { PostCommentUseCase } from "../interfaces/usecases/PostCommentUseCase"

export class PostCommentService implements PostCommentUseCase {
  private postCommentRepository: PostCommentRepository

  constructor(postCommentRepository: PostCommentRepository) {
    this.postCommentRepository = postCommentRepository
  }

  create(
    postCommentRequest: CreatePostCommentRequest,
  ): Promise<DefaultPostResponse> {
    return this.postCommentRepository.create(postCommentRequest)
  }

  fetchByPostId(postId: number): Promise<PostComment[]> {
    return this.postCommentRepository.fetchByPostId(postId)
  }

  edit(postCommentRequest: EditPostCommentRequest): Promise<void> {
    return this.postCommentRepository.edit(postCommentRequest)
  }

  remove(id: string): Promise<void> {
    return this.postCommentRepository.remove(id)
  }
}
