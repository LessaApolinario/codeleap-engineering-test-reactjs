import { Activity, useState } from "react"
import { FaFilter } from "react-icons/fa"
import { useFilteredPosts, usePosts } from "../../contexts/post/hooks"
import { PostCard } from "./post-card"
import { PostsFilter } from "./posts-filter"

export function Posts() {
  const posts = usePosts()
  const filteredPosts = useFilteredPosts()
  const [isPostsFilterVisible, setIsPostsFilterVisible] = useState(false)

  function togglePostsFilterVisibility() {
    setIsPostsFilterVisible((previousValue) => !previousValue)
  }

  function renderPosts() {
    const hasPosts = posts.length > 0
    const hasFilteredPosts = filteredPosts.length > 0

    if (!hasPosts && !hasFilteredPosts) {
      return <div className="text-center font-bold text-xl">No posts found</div>
    } else if (hasPosts && !hasFilteredPosts) {
      return (
        <div className="flex flex-col gap-3.5">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />
          })}
        </div>
      )
    } else if (hasPosts && hasFilteredPosts) {
      return (
        <div className="flex flex-col gap-3.5">
          {filteredPosts.map((post) => {
            return <PostCard key={post.id} post={post} />
          })}
        </div>
      )
    }

    return <></>
  }

  return (
    <>
      <div className="flex items-center justify-end gap-2 w-full">
        <span className="text-[#7695EC]">Filters</span>
        <FaFilter
          className="text-[#7695EC] cursor-pointer"
          onClick={togglePostsFilterVisibility}
        />
      </div>

      <Activity mode={isPostsFilterVisible ? "visible" : "hidden"}>
        <PostsFilter />
      </Activity>

      {renderPosts()}
    </>
  )
}
