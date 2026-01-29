import { useEffect, type PropsWithChildren } from "react"
import { useNavigate } from "react-router"

interface PageLoadingProps {
  to: string
  timeout?: number
}

export function PageLoading({
  children,
  to,
  timeout = 1000,
}: PropsWithChildren<PageLoadingProps>) {
  const navigate = useNavigate()

  useEffect(() => {
    const id = setTimeout(() => {
      navigate(to, { replace: true })
    }, timeout)

    return () => clearTimeout(id)
  }, [to, timeout, navigate])

  return (
    <div className="flex items-center justify-center h-screen">{children}</div>
  )
}
