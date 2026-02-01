import { useCallback, useState, type PropsWithChildren } from "react"
import { AuthContext } from "."
import type { User } from "../../../core/domain/models/User"
import type { AuthUseCase } from "../../../core/interfaces/usecases/AuthUseCase"
import constants from "../../../core/utils/constants"
import { useNotification } from "../../hooks/useNotification"
import messages from "../../../core/utils/messages"

interface AuthProviderProps {
  useCase: AuthUseCase
}

export default function AuthProvider({
  children,
  useCase,
}: PropsWithChildren<AuthProviderProps>) {
  const { showSuccessNotification, showErrorNotification } = useNotification()
  const [user, setUser] = useState<User | undefined>(() => {
    const cachedUser = localStorage.getItem(constants.USER_CACHE_KEY)
    return cachedUser ? JSON.parse(cachedUser) : undefined
  })

  const loginWithGoogle = useCallback(async () => {
    try {
      const user = await useCase.loginWithGoogle()
      setUser(user)
      localStorage.setItem(constants.USER_CACHE_KEY, JSON.stringify(user))
      showSuccessNotification(messages.loginWithSuccessMessage)
      return true
    } catch (error) {
      showErrorNotification(messages.loginWithFailureMessage)
      return false
    }
  }, [useCase])

  const logout = useCallback(async () => {
    try {
      await useCase.logout()
      setUser(undefined)
      localStorage.removeItem(constants.USER_CACHE_KEY)
      showSuccessNotification(messages.logoutSuccessMessage)
      return true
    } catch (error) {
      showErrorNotification(messages.logoutFailureMessage)
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
