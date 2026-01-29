import type { User } from "../domain/models/User"
import type { AuthRepository } from "../interfaces/repositories/AuthRepository"
import type { AuthUseCase } from "../interfaces/usecases/AuthUseCase"

export class AuthService implements AuthUseCase {
  private authRepository: AuthRepository

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository
  }

  loginWithGoogle(): Promise<User | undefined> {
    return this.authRepository.loginWithGoogle()
  }

  logout(): Promise<void> {
    return this.authRepository.logout()
  }
}
