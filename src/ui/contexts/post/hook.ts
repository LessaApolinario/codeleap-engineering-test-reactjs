import { useContext } from "react"
import { PostContext } from "."
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"
import type { PostFilterParameters } from "../../../core/domain/types/filters/post"

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

  function filterPosts() {
    postContext.filterPosts()
  }

  function clearFilters() {
    postContext.clearFilters()
  }

  function updateFilters(newFilters: PostFilterParameters) {
    postContext.updateFilters(newFilters)
  }

  return {
    posts: postContext.posts,
    filteredPosts: postContext.filteredPosts,
    filters: postContext.filters,
    fetchPosts,
    createPost,
    editPost,
    deletePost,
    filterPosts,
    clearFilters,
    updateFilters,
  }
}
