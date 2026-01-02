import { RouterProvider } from "react-router"
import { router } from "./ui/routes/router"

export function App() {
  return <RouterProvider router={router} />
}
