import { usePosts } from "../../contexts/hook"
import { PostCard } from "./post-card"

export function Posts() {
  const { posts } = usePosts()

  return (
    <div className="flex flex-col">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}
