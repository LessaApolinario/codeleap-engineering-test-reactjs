import { motion } from "motion/react"
import { useEffect, useState, type FormEvent } from "react"
import type { Post } from "../../../core/domain/models/Post"
import { Button } from "../base/button"

interface EditPostAlertProps {
  post: Post
  onCancel: () => void
  onConfirm: (title: string, content: string) => void
}

export function EditPostAlert({
  post,
  onCancel,
  onConfirm,
}: EditPostAlertProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    setTitle(post.title)
    setContent(post.content)
  }, [post])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onConfirm(title, content)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#777777]/65"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.95, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: -10, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="rounded-lg bg-white p-4 w-full sm:w-full md:w-125 lg:w-125 xl:w-125 2xl:w-125"
      >
        <h2 className="font-bold text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px] mb-4">
          Edit item
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

        <div className="flex items-center justify-end gap-4">
          <Button onClick={onCancel} className="border border-black">
            Cancel
          </Button>

          <Button type="submit" color="#47B960" textColor="#fff">
            Save
          </Button>
        </div>
      </motion.form>
    </motion.div>
  )
}
