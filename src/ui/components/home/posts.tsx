import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
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
    }

    const currentComments = hasFilteredPosts ? filteredPosts : posts

    return (
      <AnimatePresence mode="popLayout">
        <motion.div layout className="flex flex-col gap-3.5">
          {currentComments.map((post) => {
            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -20,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <PostCard post={post} />
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    )
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

      <AnimatePresence>
        {isPostsFilterVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <PostsFilter />
          </motion.div>
        )}
      </AnimatePresence>

      {renderPosts()}
    </>
  )
}
