import { useContext } from "react"
import { PostContext } from "."
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"

export function usePosts() {
  const postContext = useContext(PostContext)

  async function fetchPosts() {
    await postContext.fetchPosts()
  }

  async function createPost(postRequest: CreatePostRequest) {
    await postContext.createPost(postRequest)
  }

  async function editPost(postRequest: EditPostRequest) {
    await postContext.editPost(postRequest)
  }

  async function deletePost(id: number) {
    await postContext.deletePost(id)
  }

  return {
    posts: postContext.posts,
    fetchPosts,
    createPost,
    editPost,
    deletePost,
  }
}
