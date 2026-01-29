import { RouterProvider } from "react-router"
import AuthProvider from "../contexts/auth/AuthProvider"
import PostsProvider from "../contexts/posts/PostsProvider"
import { ViteDIContainer } from "../dicontainer/ViteDIContainer"
import { router } from "../routes/router"

export function App() {
  return (
    <AuthProvider useCase={ViteDIContainer.getAuthUseCase()}>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </AuthProvider>
  )
}
