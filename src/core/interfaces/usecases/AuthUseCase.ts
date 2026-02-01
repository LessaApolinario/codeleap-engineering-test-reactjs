import type { User } from "../../domain/models/User"

export interface AuthUseCase {
  loginWithGoogle(): Promise<User | undefined>
  logout(): Promise<void>
}
