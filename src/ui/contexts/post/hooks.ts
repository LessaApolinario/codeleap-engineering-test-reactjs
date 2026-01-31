import { useContextSelector } from "use-context-selector"
import { PostContext } from "."

export function usePosts() {
  return useContextSelector(PostContext, (ctx) => ctx.posts)
}

export function useFilteredPosts() {
  return useContextSelector(PostContext, (ctx) => ctx.filteredPosts)
}

export function usePostFilters() {
  return useContextSelector(PostContext, (ctx) => ctx.filters)
}

export function useFetchPosts() {
  return useContextSelector(PostContext, (ctx) => ctx.fetchPosts)
}

export function useCreatePost() {
  return useContextSelector(PostContext, (ctx) => ctx.createPost)
}

export function useEditPost() {
  return useContextSelector(PostContext, (ctx) => ctx.editPost)
}

export function useDeletePost() {
  return useContextSelector(PostContext, (ctx) => ctx.deletePost)
}

export function useFilterPosts() {
  return useContextSelector(PostContext, (ctx) => ctx.filterPosts)
}

export function useClearFilters() {
  return useContextSelector(PostContext, (ctx) => ctx.clearFilters)
}

export function useUpdateFilters() {
  return useContextSelector(PostContext, (ctx) => ctx.updateFilters)
}
