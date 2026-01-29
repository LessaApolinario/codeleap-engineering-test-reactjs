import type { Post } from "../../domain/models/Post"
import type { CreatePostRequest } from "../../domain/types/request/create-post-request"
import type { EditPostRequest } from "../../domain/types/request/edit-post-request"

export interface PostRepository {
  fetch(): Promise<Post[]>
  create(postRequest: CreatePostRequest): Promise<Post>
  edit(postRequest: EditPostRequest): Promise<Post>
  remove(id: number): Promise<void>
}
