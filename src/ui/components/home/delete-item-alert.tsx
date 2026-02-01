import { motion } from "motion/react"
import { Button } from "../base/button"

interface DeleteItemAlertProps {
  onCancel: () => void
  onClose: () => void
  title?: string
}

export function DeleteItemAlert({
  onCancel,
  onClose,
  title,
}: DeleteItemAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#777777]/65"
    >
      <motion.div
        initial={{ scale: 0.95, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: -10, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="rounded-lg bg-white p-4 w-full sm:w-full md:w-125 lg:w-125 xl:w-125 2xl:w-125"
      >
        <h2 className="font-bold text-lg sm:text-[22px] md:text-[22px] lg:text-[22px] xl:text-[22px] 2xl:text-[22px] mb-4">
          {title ?? "Are you sure you want to delete this item?"}
        </h2>

        <div className="flex items-center justify-end gap-4">
          <Button onClick={onCancel} className="border border-black">
            Cancel
          </Button>

          <Button onClick={onClose} color="#FF5151" textColor="#fff">
            Delete
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
