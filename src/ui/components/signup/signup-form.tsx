import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"
import { Button } from "../base/button"

export function SignUpForm() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const isUsernameDefined = username.length > 0
    if (isUsernameDefined) {
      localStorage.setItem(
        "@codeleap-engineering-test-reactjs/username",
        username
      )
      navigate("/home")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-px border-gray-default rounded-2xl p-4 w-4/5 sm:4/5 md:w-125 lg:w-125 xl:w-125 2xl:w-125"
    >
      <h2 className="font-bold text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px] mb-4">
        Welcome to CodeLeap network!
      </h2>

      <div className="flex flex-col gap-1.5 mb-4">
        <label htmlFor="username-field" className="font-normal text-base">
          Please enter your username
        </label>
        <input
          type="text"
          placeholder="Jhon Doe"
          className="border border-gray-default h-8 rounded-lg p-0.5"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="flex items-center justify-end">
        <Button disabled={!username.length} type="submit">
          ENTER
        </Button>
      </div>
    </form>
  )
}
