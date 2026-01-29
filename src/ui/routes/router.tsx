import { createBrowserRouter } from "react-router"
import { PageLoading } from "../components/base/page-loading"
import { Spinner } from "../components/base/spinner"
import RootLayout from "../layouts/RootLayout"
import HomePage from "../pages/HomePage"
import SignUpPage from "../pages/SignUpPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SignUpPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/loading/home",
        element: (
          <PageLoading to="/home" timeout={1500}>
            <Spinner color="#7695EC" />
          </PageLoading>
        ),
      },
      {
        path: "/loading/logout",
        element: (
          <PageLoading to="/" timeout={1500}>
            <Spinner color="#7695EC" />
          </PageLoading>
        ),
      },
    ],
  },
])

export { router }
