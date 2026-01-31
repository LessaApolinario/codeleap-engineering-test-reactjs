import { useContextSelector } from "use-context-selector"
import { PostCommentContext } from "."

export function usePostCommentsByPostId() {
  return useContextSelector(
    PostCommentContext,
    (ctx) => ctx.postCommentsByPostId,
  )
}

export function useCreatePostComment() {
  return useContextSelector(PostCommentContext, (ctx) => ctx.createPostComment)
}

export function useFetchPostCommentsByPostId() {
  return useContextSelector(
    PostCommentContext,
    (ctx) => ctx.fetchPostCommentsByPostId,
  )
}

export function useEditPostComment() {
  return useContextSelector(PostCommentContext, (ctx) => ctx.editPostComment)
}

export function useRemovePostComment() {
  return useContextSelector(PostCommentContext, (ctx) => ctx.removePostComment)
}
