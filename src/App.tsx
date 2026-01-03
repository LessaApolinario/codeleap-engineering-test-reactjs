import { RouterProvider } from "react-router"
import PostsProvider from "./ui/contexts/PostsProvider"
import { router } from "./ui/routes/router"

export function App() {
  return (
    <PostsProvider>
      <RouterProvider router={router} />
    </PostsProvider>
  )
}
