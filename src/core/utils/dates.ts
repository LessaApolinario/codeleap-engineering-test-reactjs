import { Timestamp } from "firebase/firestore"

export function formatDate(date: string | Timestamp) {
  let formattedDate: Date | string
  if (date instanceof Timestamp) {
    formattedDate = date.toDate()
  } else {
    formattedDate = new Date(date)
  }

  const day = formattedDate.getDate().toString().padStart(2, "0")
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0")
  const year = formattedDate.getFullYear()

  const hours = formattedDate.getHours().toString().padStart(2, "0")
  const minutes = formattedDate.getMinutes().toString().padStart(2, "0")

  return `${month}/${day}/${year} at ${hours}:${minutes}`
}

export function convertToDate(date: string | Timestamp) {
  if (date instanceof Timestamp) {
    return date.toDate()
  }

  return new Date(date)
}
