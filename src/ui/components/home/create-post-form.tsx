import { useState, type FormEvent } from "react"
import { Button } from "../base/button"
import { usePosts } from "../../contexts/post/hook"

export function CreatePostForm() {
  const { createPost } = usePosts()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  function clearFormFields() {
    setTitle("")
    setContent("")
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await createPost({ title, content })
    clearFormFields()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-default rounded-lg p-4"
    >
      <h2 className="font-bold text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px] mb-4">
        What's on your mind?
      </h2>

      <div className="flex flex-col gap-1.5 mb-4">
        <label htmlFor="title-field" className="font-normal text-base">
          Title
        </label>
        <input
          type="text"
          id="title-field"
          className="p-2 rounded-lg border border-gray-default"
          value={title}
          placeholder="Hello world"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <label htmlFor="content-field" className="font-normal text-base">
          Content
        </label>
        <textarea
          id="content-field"
          className="p-2 rounded-lg border border-gray-default"
          value={content}
          placeholder="Content here"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end">
        <Button
          type="submit"
          color="#7695EC"
          textColor="#fff"
          disabled={!title || !content}
        >
          Create
        </Button>
      </div>
    </form>
  )
}
