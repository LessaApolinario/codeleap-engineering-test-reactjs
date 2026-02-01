import { createContext } from "use-context-selector"
import type { User } from "../../../core/domain/models/User"

interface AuthProps {
  user: User | undefined
  loginWithGoogle: () => Promise<boolean>
  logout: () => Promise<boolean>
  updateUser: (user: User | undefined) => void
}

export const AuthContext = createContext({} as AuthProps)
