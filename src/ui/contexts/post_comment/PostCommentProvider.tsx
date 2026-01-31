import { useCallback, useState, type PropsWithChildren } from "react"
import { PostCommentContext } from "."
import type { PostComment } from "../../../core/domain/models/PostComment"
import type { CreatePostCommentRequest } from "../../../core/domain/types/request/post_comment/create-post-comment-request"
import type { EditPostCommentRequest } from "../../../core/domain/types/request/post_comment/edit-post-comment-request"
import type { PostCommentUseCase } from "../../../core/interfaces/usecases/PostCommentUseCase"
import messages from "../../../core/utils/messages"
import { useNotification } from "../../hooks/useNotification"

interface PostCommentProviderProps {
  useCase: PostCommentUseCase
}

export default function PostCommentProvider({
  children,
  useCase,
}: PropsWithChildren<PostCommentProviderProps>) {
  const { showErrorNotification } = useNotification()
  const [postCommentsByPostId, setPostCommentsByPostId] = useState<
    Record<string, PostComment[]>
  >({})

  const createPostComment = useCallback(
    async (postCommentRequest: CreatePostCommentRequest) => {
      try {
        const response = await useCase.create(postCommentRequest)
        const newComment: PostComment = {
          id: response.id,
          author: postCommentRequest.author,
          content: postCommentRequest.content,
          post_id: postCommentRequest.post_id,
          created_at: new Date().toString(),
          updated_at: "",
        }

        setPostCommentsByPostId((previousPostCommentsById) => {
          return {
            ...previousPostCommentsById,
            [postCommentRequest.post_id]: [
              newComment,
              ...previousPostCommentsById[postCommentRequest.post_id],
            ],
          }
        })
      } catch (error) {
        showErrorNotification(messages.createPostCommentWithFailureMessage)
      }
    },
    [],
  )

  const fetchPostCommentsByPostId = useCallback(async (postId: number) => {
    try {
      const newPostComments = await useCase.fetchByPostId(postId)
      setPostCommentsByPostId((previousPostCommentsById) => ({
        ...previousPostCommentsById,
        [postId]: newPostComments,
      }))
    } catch (error) {
      showErrorNotification(messages.fetchPostCommentsWithFailureMessage)
    }
  }, [])

  const editPostComment = useCallback(
    async (postCommentRequest: EditPostCommentRequest) => {
      try {
        await useCase.edit(postCommentRequest)

        const editedPostComment = {
          id: postCommentRequest.id,
          author: postCommentRequest.author,
          content: postCommentRequest.content,
          post_id: postCommentRequest.post_id,
          updated_at: new Date().toString(),
        }

        setPostCommentsByPostId((previousPostCommentsById) => {
          return {
            ...previousPostCommentsById,
            [postCommentRequest.post_id]: previousPostCommentsById[
              editedPostComment.post_id
            ].map((postComment) => {
              if (postComment.id === postCommentRequest.id) {
                return {
                  ...postComment,
                  ...editedPostComment,
                }
              }
              return postComment
            }),
          }
        })
      } catch (error) {
        showErrorNotification(messages.editPostCommentWithFailureMessage)
      }
    },
    [],
  )

  const removePostComment = useCallback(async (postComment: PostComment) => {
    try {
      await useCase.remove(postComment.id)

      setPostCommentsByPostId((previousPostCommentsById) => {
        return {
          ...previousPostCommentsById,
          [postComment.post_id]: previousPostCommentsById[
            postComment.post_id
          ].filter((previousPostComment) => {
            return previousPostComment.id !== postComment.id
          }),
        }
      })
    } catch (error) {
      showErrorNotification(messages.removePostCommentWithFailureMessage)
    }
  }, [])

  return (
    <PostCommentContext.Provider
      value={{
        postCommentsByPostId,
        createPostComment,
        fetchPostCommentsByPostId,
        editPostComment,
        removePostComment,
      }}
    >
      {children}
    </PostCommentContext.Provider>
  )
}
