import { usePosts } from "../../contexts/hook"
import { PostCard } from "./post-card"

export function Posts() {
  const { posts } = usePosts()

  const handleOpenEditPostAlert = () => {}

  const handleOpenDeletePostAlert = () => {}

  return (
    <div className="flex flex-col">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            onEditPost={handleOpenEditPostAlert}
            onDeletePost={handleOpenDeletePostAlert}
          />
        )
      })}
    </div>
  )
}
