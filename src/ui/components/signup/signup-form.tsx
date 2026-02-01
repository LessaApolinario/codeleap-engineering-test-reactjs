import { useState, type FormEvent } from "react"
import { FaGoogle } from "react-icons/fa"
import { useNavigate } from "react-router"
import constants from "../../../core/utils/constants"
import { createLocalUserFromUsername } from "../../../core/utils/user"
import { useLoginWithGoogle, useUpdateUser } from "../../contexts/auth/hooks"
import { Button } from "../base/button"

export function SignUpForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const loginWithGoogle = useLoginWithGoogle()
  const updateUser = useUpdateUser()

  async function handleLoginWithGoogle() {
    const wasLoginSuccessFull = await loginWithGoogle()
    if (wasLoginSuccessFull) {
      navigate("/loading/home")
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const isUsernameDefined = username.length > 0
    if (isUsernameDefined) {
      const newUser = createLocalUserFromUsername(username)
      updateUser(newUser)
      localStorage.setItem(constants.USER_CACHE_KEY, JSON.stringify(newUser))
      navigate("/loading/home")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-px border-gray-default rounded-2xl p-4 w-11/12 sm:4/5 md:w-125 lg:w-125 xl:w-125 2xl:w-125"
    >
      <h2 className="font-bold text-base sm:text-base md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px] mb-4">
        Welcome to CodeLeap network!
      </h2>

      <div className="flex flex-col gap-1.5 mb-4">
        <label
          htmlFor="username-field"
          className="font-normal text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base"
        >
          Please enter your username
        </label>
        <input
          type="text"
          placeholder="Jhon Doe"
          className="border border-gray-default h-8 rounded-lg p-0.5 text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="flex items-center justify-end mb-4">
        <Button
          disabled={!username.length}
          color="#7695EC"
          textColor="#fff"
          type="submit"
          className="text-xs sm:text-base md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
        >
          ENTER
        </Button>
      </div>

      <div className="w-full flex items-center justify-center">
        <Button
          type="button"
          color="#141414"
          textColor="#fff"
          onClick={handleLoginWithGoogle}
          className="flex items-center justify-center gap-2 text-xs sm:text-base md:text-sm lg:text-lg xl:text-lg 2xl:text-lg"
        >
          Login with Google
          <FaGoogle className="text-white" />
        </Button>
      </div>
    </form>
  )
}
