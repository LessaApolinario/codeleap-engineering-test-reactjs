import { useEffect } from "react"
import { CreatePostForm } from "../components/home/create-post-form"
import { Posts } from "../components/home/posts"
import { usePosts } from "../contexts/hook"

export default function HomePage() {
  const { fetchPosts } = usePosts()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen">
      <div className="bg-white min-h-screen w-full sm:w-full mx-auto md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3">
        <header className="bg-[#7695EC] p-4">
          <h2 className="font-bold text-white text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px]">
            CodeLeap Network
          </h2>
        </header>

        <div className="p-4">
          <CreatePostForm />
          <Posts />
        </div>
      </div>
    </main>
  )
}
