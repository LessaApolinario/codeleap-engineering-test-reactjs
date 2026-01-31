import { Button } from "../base/button"

interface DeletePostAlertProps {
  onCancel: () => void
  onClose: () => void
  title?: string
}

export function DeleteItemAlert({
  onCancel,
  onClose,
  title,
}: DeletePostAlertProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#777777]/65">
      <div className="rounded-lg bg-white p-4 w-full sm:w-full md:w-125 lg:w-125 xl:w-125 2xl:w-125">
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
      </div>
    </div>
  )
}
