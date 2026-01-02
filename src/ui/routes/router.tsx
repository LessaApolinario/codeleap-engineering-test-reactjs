import { createBrowserRouter } from "react-router"
import RootLayout from "../layouts/RootLayout"
import SignUpPage from "../pages/SignUpPage"
import HomePage from "../pages/HomePage"

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
    ],
  },
])

export { router }
