import { useEffect } from "react"
import { FaArrowRightFromBracket } from "react-icons/fa6"
import { useNavigate } from "react-router"
import constants from "../../core/utils/constants"
import { UserAvatar } from "../components/auth/user-avatar"
import { Button } from "../components/base/button"
import { CreatePostForm } from "../components/home/create-post-form"
import { Posts } from "../components/home/posts"
import { useLogout, useUser } from "../contexts/auth/hooks"
import { useFetchPosts } from "../contexts/post/hooks"

export default function HomePage() {
  const navigate = useNavigate()
  const fetchPosts = useFetchPosts()
  const user = useUser()
  const logout = useLogout()

  function clearUsernameFromLocalStorage() {
    localStorage.removeItem(constants.USER_CACHE_KEY)
  }

  async function handleLogout() {
    if (user?.isLocal) {
      navigate("/loading/logout")
      return
    }

    const wasLogoutSuccessful = await logout()
    if (wasLogoutSuccessful) {
      navigate("/loading/logout")
    }
  }

  useEffect(() => {
    const user = localStorage.getItem(constants.USER_CACHE_KEY)
    if (!user) {
      navigate("/loading/logout")
      return
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
            CodeLeap Network
          </h2>

          <div className="w-full flex items-center justify-between gap-2">
            <UserAvatar user={user} />

            <Button
              type="button"
              color="#fff"
              textColor="#7695EC"
              onClick={handleLogout}
              className="flex items-center justify-between gap-2"
            >
              Logout <FaArrowRightFromBracket className="ml-2" />
            </Button>
          </div>
        </header>

        <div className="p-4 flex flex-col gap-3.5">
          <CreatePostForm />
          <Posts />
        </div>
      </div>
    </main>
  )
}
