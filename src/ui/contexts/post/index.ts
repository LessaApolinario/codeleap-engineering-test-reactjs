import { createContext } from "react"
import type { Post } from "../../../core/domain/models/Post"
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"

interface PostsProps {
  posts: Post[]
  fetchPosts: () => Promise<void>
  createPost: (postRequest: CreatePostRequest) => Promise<void>
  editPost: (postRequest: EditPostRequest) => Promise<void>
  deletePost: (id: number) => Promise<void>
}

export const PostContext = createContext({} as PostsProps)
