import { useCallback, useState, type PropsWithChildren } from "react"
import { PostContext } from "."
import type { Post } from "../../../core/domain/models/Post"
import type { PostFilterParameters } from "../../../core/domain/types/filters/post"
import type { CreatePostRequest } from "../../../core/domain/types/request/post/create-post-request"
import type { EditPostRequest } from "../../../core/domain/types/request/post/edit-post-request"
import type { PostUseCase } from "../../../core/interfaces/usecases/PostUseCase"
import { convertToDate } from "../../../core/utils/dates"
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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [filters, setFilters] = useState<PostFilterParameters>({
    username: "",
    title: "",
    content: "",
    startDate: null,
    endDate: null,
  })

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

  const filterPosts = useCallback(() => {
    const hasAnyFilter = Object.values(filters).some(Boolean)

    if (!hasAnyFilter) {
      setFilteredPosts([])
      return
    }

    const startDate = filters.startDate ? new Date(filters.startDate) : null

    const endDate = filters.endDate ? new Date(filters.endDate) : null

    if (startDate) startDate.setHours(0, 0, 0, 0)
    if (endDate) endDate.setHours(23, 59, 59, 999)

    const newFilteredPosts = posts.filter((post) => {
      const postDate = convertToDate(post.created_datetime)

      const usernameMatch =
        !filters.username ||
        post.username.toLowerCase().includes(filters.username.toLowerCase())

      const titleMatch =
        !filters.title ||
        post.title.toLowerCase().includes(filters.title.toLowerCase())

      const contentMatch =
        !filters.content ||
        post.content.toLowerCase().includes(filters.content.toLowerCase())

      const dateMatch =
        (!startDate || postDate >= startDate) &&
        (!endDate || postDate <= endDate)

      return usernameMatch && titleMatch && contentMatch && dateMatch
    })

    if (newFilteredPosts.length > 0) {
      setFilteredPosts(newFilteredPosts)
    }
  }, [filters, posts])

  const likeUnlikePost = useCallback((id: number) => {
    setPosts((previousPosts) =>
      previousPosts.map((post) =>
        post.id === id ? { ...post, is_liked: !post.is_liked } : post,
      ),
    )
  }, [])

  const clearFilters = useCallback(() => {
    setFilteredPosts([])
    setFilters({
      username: "",
      title: "",
      content: "",
      startDate: null,
      endDate: null,
    })
  }, [])

  const updateFilters = useCallback((newFilters: PostFilterParameters) => {
    setFilters(newFilters)
  }, [])

  return (
    <PostContext.Provider
      value={{
        posts,
        filters,
        fetchPosts,
        createPost,
        editPost,
        deletePost,
        filteredPosts,
        filterPosts,
        clearFilters,
        updateFilters,
        likeUnlikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
