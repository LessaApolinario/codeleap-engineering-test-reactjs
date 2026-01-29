import type { Post } from "../../../core/domain/models/Post"
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"
import type { PostRepository } from "../../../core/interfaces/repositories/PostRepository"
import { BaseAPI } from "../BaseAPI"

export class PostAPI extends BaseAPI implements PostRepository {
  async fetch(): Promise<Post[]> {
    const response = await this.client.get<{ results: Post[] }>("/careers/")
    return response.data.results
  }

  async create(postRequest: CreatePostRequest): Promise<Post> {
    const response = await this.client.post<Post>("/careers/", postRequest)
    return response.data
  }

  async edit(postRequest: EditPostRequest): Promise<Post> {
    const editPostPayload = {
      title: postRequest.title,
      content: postRequest.content,
    }
    const response = await this.client.patch<Post>(
      `/careers/${postRequest.id}/`,
      editPostPayload,
    )

    return response.data
  }

  async remove(id: number): Promise<void> {
    await this.client.delete(`/careers/${id}/`)
  }
}
