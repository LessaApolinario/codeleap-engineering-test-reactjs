import { useCallback, useState, type PropsWithChildren } from "react"
import { PostsContext } from "."
import { axiosInstance } from "../../infra/axios"
import type { Post } from "../../types/Post"
import type { CreatePostRequest } from "../../types/request/create-post-request"
import type { EditPostRequest } from "../../types/request/edit-post-request"

export default function PostsProvider({ children }: PropsWithChildren) {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axiosInstance.get<{ results: Post[] }>("/careers/")
      setPosts(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const createPost = useCallback(async (postRequest: CreatePostRequest) => {
    try {
      const createPostPayload = {
        ...postRequest,
        username: localStorage.getItem(
          "@codeleap-engineering-test-reactjs/username"
        ),
      }
      const response = await axiosInstance.post<Post>(
        "/careers/",
        createPostPayload
      )
      setPosts((previousPosts) => [response.data, ...previousPosts])
    } catch (error) {
      console.error(error)
    }
  }, [])

  const editPost = useCallback(async (postRequest: EditPostRequest) => {
    try {
      const response = await axiosInstance.put<Post>("/careers/", postRequest)

      setPosts((previousPosts) =>
        previousPosts.map((post) =>
          post.id === response.data.id ? response.data : post
        )
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  const deletePost = useCallback(async (id: number) => {
    try {
      await axiosInstance.delete(`/careers/${id}/`)

      setPosts((previousPosts) =>
        previousPosts.filter((post) => post.id !== id)
      )
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <PostsContext.Provider
      value={{
        posts,
        fetchPosts,
        createPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
