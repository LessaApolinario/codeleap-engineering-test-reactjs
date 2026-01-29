import type { AuthUseCase } from "../../core/interfaces/usecases/AuthUseCase"
import { AuthService } from "../../core/services/AuthService"
import { AuthFirebaseRepository } from "../../infra/firebase/auth/AuthFirebaseRepository"

export class ViteDIContainer {
  static getAuthUseCase(): AuthUseCase {
    return new AuthService(new AuthFirebaseRepository())
  }
}
