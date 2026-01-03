import { useContext } from "react"
import { PostsContext } from "."
import type { CreatePostRequest } from "../../types/request/create-post-request"
import type { EditPostRequest } from "../../types/request/edit-post-request"

export function usePosts() {
  const postsContext = useContext(PostsContext)

  async function fetchPosts() {
    await postsContext.fetchPosts()
  }

  async function createPost(postRequest: CreatePostRequest) {
    await postsContext.createPost(postRequest)
  }

  async function editPost(postRequest: EditPostRequest) {
    await postsContext.editPost(postRequest)
  }

  async function deletePost(id: number) {
    await postsContext.deletePost(id)
  }

  return {
    posts: postsContext.posts,
    fetchPosts,
    createPost,
    editPost,
    deletePost,
  }
}
