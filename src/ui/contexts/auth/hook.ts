import { useContext } from "react"
import { AuthContext } from "."
import type { User } from "../../../core/domain/models/User"

export function useAuth() {
  const authContext = useContext(AuthContext)

  async function loginWithGoogle() {
    return await authContext.loginWithGoogle()
  }

  async function logout() {
    return await authContext.logout()
  }

  function updateUser(user: User | undefined) {
    authContext.updateUser(user)
  }

  return {
    user: authContext.user,
    loginWithGoogle,
    logout,
    updateUser,
  }
}
