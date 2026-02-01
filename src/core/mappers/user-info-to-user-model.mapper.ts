import type { UserInfo } from "firebase/auth"
import type { User } from "../domain/models/User"

export class UserInfoToUserModelMapper {
  static toDomain(info: UserInfo): User {
    return {
      id: info.uid,
      name: info.displayName ?? "",
      email: info.email ?? "",
      photoURL: info.photoURL ?? "",
      isLocal: false,
    }
  }
}
