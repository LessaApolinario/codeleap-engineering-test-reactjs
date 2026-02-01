import type { User } from "../../domain/models/User"

export interface AuthRepository {
  loginWithGoogle(): Promise<User | undefined>
  logout(): Promise<void>
}
