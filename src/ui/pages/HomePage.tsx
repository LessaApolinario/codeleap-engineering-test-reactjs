import { useEffect } from "react"
import { useNavigate } from "react-router"
import constants from "../../core/utils/constants"
import { Button } from "../components/base/button"
import { CreatePostForm } from "../components/home/create-post-form"
import { Posts } from "../components/home/posts"
import { useAuth } from "../contexts/auth/hook"
import { usePosts } from "../contexts/posts/hook"

export default function HomePage() {
  const navigate = useNavigate()
  const { fetchPosts } = usePosts()
  const { user, logout } = useAuth()

  function clearUsernameFromLocalStorage() {
    localStorage.removeItem(constants.USER_CACHE_KEY)
  }

  async function handleLogout() {
    if (user?.isLocal) {
      navigate("/")
      return
    }

    const wasLogoutSuccessful = await logout()
    if (wasLogoutSuccessful) {
      navigate("/")
    }
  }

  useEffect(() => {
    const user = localStorage.getItem(constants.USER_CACHE_KEY)
    if (!user) {
      navigate("/")
    }

    fetchPosts()

    return () => {
      clearUsernameFromLocalStorage()
    }
  }, [])

  return (
    <main className="min-h-screen">
      <div className="bg-white min-h-screen w-full sm:w-full mx-auto md:w-2xl lg:w-2xl xl:w-2xl 2xl:w-2xl">
        <header className="bg-[#7695EC] p-4 flex items-center justify-between gap-2 flex-wrap">
          <h2 className="font-bold text-white text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px]">
            CodeLeap Network - Welcome {user?.name ?? "-"}
          </h2>

          <Button
            type="button"
            color="#fff"
            textColor="#7695EC"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>

        <div className="p-4 flex flex-col gap-3.5">
          <CreatePostForm />
          <Posts />
        </div>
      </div>
    </main>
  )
}
