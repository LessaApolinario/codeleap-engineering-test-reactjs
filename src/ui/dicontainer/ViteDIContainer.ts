import type { AuthUseCase } from "../../core/interfaces/usecases/AuthUseCase"
import type { PostUseCase } from "../../core/interfaces/usecases/PostUseCase"
import { AuthService } from "../../core/services/AuthService"
import { PostService } from "../../core/services/PostService"
import { PostAPI } from "../../infra/api/post/PostAPI"
import { AuthFirebaseRepository } from "../../infra/firebase/auth/AuthFirebaseRepository"

export class ViteDIContainer {
  static getAuthUseCase(): AuthUseCase {
    return new AuthService(new AuthFirebaseRepository())
  }

  static getPostUseCase(): PostUseCase {
    return new PostService(new PostAPI())
  }
}
