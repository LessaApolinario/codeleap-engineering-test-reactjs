import { usePosts } from "../../contexts/post/hook"
import { PostCard } from "./post-card"

export function Posts() {
  const { posts } = usePosts()

  return (
    <div className="flex flex-col gap-3.5">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />
      })}
    </div>
  )
}
