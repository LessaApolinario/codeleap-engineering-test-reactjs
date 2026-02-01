import type { Post } from "../domain/models/Post"
import type { CreatePostRequest } from "../domain/types/request/post/create-post-request"
import type { EditPostRequest } from "../domain/types/request/post/edit-post-request"
import type { PostRepository } from "../interfaces/repositories/PostRepository"
import type { PostUseCase } from "../interfaces/usecases/PostUseCase"

export class PostService implements PostUseCase {
  private postRepository: PostRepository

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository
  }

  fetch(): Promise<Post[]> {
    return this.postRepository.fetch()
  }

  create(postRequest: CreatePostRequest): Promise<Post> {
    return this.postRepository.create(postRequest)
  }

  edit(postRequest: EditPostRequest): Promise<Post> {
    return this.postRepository.edit(postRequest)
  }

  remove(id: number): Promise<void> {
    return this.postRepository.remove(id)
  }
}
