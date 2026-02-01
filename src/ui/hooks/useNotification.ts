import { toast } from "react-toastify"

export function useNotification() {
  function showSuccessNotification(message: string) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }

  function showErrorNotification(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    })
  }

  return { showSuccessNotification, showErrorNotification }
}
