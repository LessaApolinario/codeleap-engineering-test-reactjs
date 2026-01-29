import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import type { User } from "../../../core/domain/models/User"
import type { AuthRepository } from "../../../core/interfaces/repositories/AuthRepository"
import { UserInfoToUserModelMapper } from "../../../core/mappers/user-info-to-user-model.mapper"
import { BaseFirebaseRepository } from "../BaseFirebaseRepository"

export class AuthFirebaseRepository
  extends BaseFirebaseRepository
  implements AuthRepository
{
  async loginWithGoogle(): Promise<User | undefined> {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(this.auth, provider)

    if (!result.user) {
      return
    }

    return UserInfoToUserModelMapper.toDomain(result.user)
  }

  async logout(): Promise<void> {
    await this.auth.signOut()
  }
}
