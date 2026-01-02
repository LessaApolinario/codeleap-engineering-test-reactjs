import { createBrowserRouter } from "react-router"
import RootLayout from "../layouts/RootLayout"
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
    ],
  },
])

export { router }
