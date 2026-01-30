import { createContext } from "react"
import type { Post } from "../../../core/domain/models/Post"
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"
import type { PostFilterParameters } from "../../../core/domain/types/filters/post"

interface PostsProps {
  posts: Post[]
  filteredPosts: Post[]
  filters: PostFilterParameters
  fetchPosts: () => Promise<void>
  createPost: (postRequest: CreatePostRequest) => Promise<void>
  editPost: (postRequest: EditPostRequest) => Promise<void>
  deletePost: (id: number) => Promise<void>
  filterPosts: () => void
  clearFilters: () => void
  updateFilters: (newFilters: PostFilterParameters) => void
}

export const PostContext = createContext({} as PostsProps)
