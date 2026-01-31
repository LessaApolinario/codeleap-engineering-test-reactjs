import type { AuthUseCase } from "../../core/interfaces/usecases/AuthUseCase"
import type { PostCommentUseCase } from "../../core/interfaces/usecases/PostCommentUseCase"
import type { PostUseCase } from "../../core/interfaces/usecases/PostUseCase"
import { AuthService } from "../../core/services/AuthService"
import { PostCommentService } from "../../core/services/PostCommentService"
import { PostService } from "../../core/services/PostService"
import { PostAPI } from "../../infra/api/post/PostAPI"
import { AuthFirebaseRepository } from "../../infra/firebase/auth/AuthFirebaseRepository"
import { PostCommentFirebaseRepository } from "../../infra/firebase/post_comment/PostCommentFirebaseRepository"

export class ViteDIContainer {
  static getAuthUseCase(): AuthUseCase {
    return new AuthService(new AuthFirebaseRepository())
  }

  static getPostUseCase(): PostUseCase {
    return new PostService(new PostAPI())
  }

  static getPostCommentUseCase(): PostCommentUseCase {
    return new PostCommentService(new PostCommentFirebaseRepository())
  }
}
