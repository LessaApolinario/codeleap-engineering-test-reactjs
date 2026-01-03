import { createContext } from "react"
import type { Post } from "../../types/Post"
import type { CreatePostRequest } from "../../types/request/create-post-request"
import type { EditPostRequest } from "../../types/request/edit-post-request"

interface PostsProps {
  posts: Post[]
  fetchPosts: () => Promise<void>
  createPost: (postRequest: CreatePostRequest) => Promise<void>
  editPost: (postRequest: EditPostRequest) => Promise<void>
  deletePost: (id: number) => Promise<void>
}

export const PostsContext = createContext({} as PostsProps)
