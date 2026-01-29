import { useCallback, useState, type PropsWithChildren } from "react"
import { AuthContext } from "."
import type { User } from "../../../core/domain/models/User"
import type { AuthUseCase } from "../../../core/interfaces/usecases/AuthUseCase"
import constants from "../../../core/utils/constants"

interface AuthProviderProps {
  useCase: AuthUseCase
}

export default function AuthProvider({
  children,
  useCase,
}: PropsWithChildren<AuthProviderProps>) {
  const [user, setUser] = useState<User | undefined>(() => {
    const cachedUser = localStorage.getItem(constants.USER_CACHE_KEY)
    return cachedUser ? JSON.parse(cachedUser) : undefined
  })

  const loginWithGoogle = useCallback(async () => {
    try {
      const user = await useCase.loginWithGoogle()
      setUser(user)
      localStorage.setItem(constants.USER_CACHE_KEY, JSON.stringify(user))
      return true
    } catch (error) {
      // toast aqui
      return false
    }
  }, [useCase])

  const logout = useCallback(async () => {
    try {
      await useCase.logout()
      setUser(undefined)
      localStorage.removeItem(constants.USER_CACHE_KEY)
      return true
    } catch (error) {
      // toast aqui
      return false
    }
  }, [useCase])

  const updateUser = useCallback((user: User | undefined) => {
    setUser(user)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
