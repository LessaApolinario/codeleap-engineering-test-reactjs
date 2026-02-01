import { RouterProvider } from "react-router"
import { ToastContainer } from "react-toastify"
import AuthProvider from "../contexts/auth/AuthProvider"
import PostProvider from "../contexts/post/PostProvider"
import PostCommentProvider from "../contexts/post_comment/PostCommentProvider"
import { ViteDIContainer } from "../dicontainer/ViteDIContainer"
import { router } from "../routes/router"

export function App() {
  return (
    <>
      <AuthProvider useCase={ViteDIContainer.getAuthUseCase()}>
        <PostProvider useCase={ViteDIContainer.getPostUseCase()}>
          <PostCommentProvider
            useCase={ViteDIContainer.getPostCommentUseCase()}
          >
            <RouterProvider router={router} />
          </PostCommentProvider>
        </PostProvider>
      </AuthProvider>

      <ToastContainer />
    </>
  )
}
