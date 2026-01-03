import { useEffect } from "react"
import { useNavigate } from "react-router"
import { CreatePostForm } from "../components/home/create-post-form"
import { Posts } from "../components/home/posts"
// import { usePosts } from "../contexts/hook"

export default function HomePage() {
  const navigate = useNavigate()
  // const { fetchPosts } = usePosts()

  function clearUsernameFromLocalStorage() {
    localStorage.removeItem("@codeleap-engineering-test-reactjs/username")
  }

  useEffect(() => {
    const username = localStorage.getItem(
      "@codeleap-engineering-test-reactjs/username"
    )
    if (!username) {
      navigate("/")
    }

    // fetchPosts()

    return () => {
      clearUsernameFromLocalStorage()
    }
  }, [])

  return (
    <main className="min-h-screen">
      <div className="bg-white min-h-screen w-full sm:w-full mx-auto md:w-2xl lg:w-2xl xl:w-2xl 2xl:w-2xl">
        <header className="bg-[#7695EC] p-4">
          <h2 className="font-bold text-white text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px]">
            CodeLeap Network
          </h2>
        </header>

        <div className="p-4 flex flex-col gap-3.5">
          <CreatePostForm />
          <Posts />
        </div>
      </div>
    </main>
  )
}
