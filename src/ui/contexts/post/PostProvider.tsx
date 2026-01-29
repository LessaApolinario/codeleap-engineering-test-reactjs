import { useCallback, useState, type PropsWithChildren } from "react"
import { PostContext } from "."
import type { Post } from "../../../core/domain/models/Post"
import type { CreatePostRequest } from "../../../core/domain/types/request/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/edit-post-request"
import type { PostUseCase } from "../../../core/interfaces/usecases/PostUseCase"
import messages from "../../../core/utils/messages"
import { useNotification } from "../../hooks/useNotification"

interface PostProviderProps {
  useCase: PostUseCase
}

export default function PostProvider({
  children,
  useCase,
}: PropsWithChildren<PostProviderProps>) {
  const { showSuccessNotification, showErrorNotification } = useNotification()
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = useCallback(async () => {
    try {
      const fetchedPosts = await useCase.fetch()
      setPosts(fetchedPosts)
    } catch (error) {
      showErrorNotification(messages.fetchPostsWithFailureMessage)
    }
  }, [])

  const createPost = useCallback(async (postRequest: CreatePostRequest) => {
    try {
      const newPost = await useCase.create(postRequest)
      setPosts((previousPosts) => [newPost, ...previousPosts])
      showSuccessNotification(messages.createPostWithSuccessMessage)
    } catch (error) {
      showErrorNotification(messages.createPostWithFailureMessage)
    }
  }, [])

  const editPost = useCallback(async (postRequest: EditPostRequest) => {
    try {
      const editedPost = await useCase.edit(postRequest)
      setPosts((previousPosts) =>
        previousPosts.map((post) =>
          post.id === editedPost.id ? editedPost : post,
        ),
      )
      showSuccessNotification(messages.editPostWithSuccessMessage)
    } catch (error) {
      showErrorNotification(messages.editPostWithFailureMessage)
    }
  }, [])

  const deletePost = useCallback(async (id: number) => {
    try {
      await useCase.remove(id)
      setPosts((previousPosts) =>
        previousPosts.filter((post) => post.id !== id),
      )
      showSuccessNotification(messages.removePostWithSuccessMessage)
    } catch (error) {
      showErrorNotification(messages.removePostWithFailureMessage)
    }
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        fetchPosts,
        createPost,
        editPost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
