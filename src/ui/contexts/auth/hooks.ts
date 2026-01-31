import { useContextSelector } from "use-context-selector"
import { AuthContext } from "."
import type { User } from "../../../core/domain/models/User"

export function useUser() {
  return useContextSelector(AuthContext, (ctx) => ctx.user)
}

export function useLoginWithGoogle() {
  return useContextSelector(AuthContext, (ctx) => ctx.loginWithGoogle)
}

export function useLogout() {
  return useContextSelector(AuthContext, (ctx) => ctx.logout)
}

export function useUpdateUser() {
  return useContextSelector(AuthContext, (ctx) => ctx.updateUser)
}
