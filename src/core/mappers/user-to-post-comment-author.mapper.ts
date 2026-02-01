import type { PostCommentAuthor } from "../domain/models/PostCommentAuthor"
import type { User } from "../domain/models/User"

export class UserToPostCommentAuthorMapper {
  static toPostCommentAuthor(user: User): PostCommentAuthor {
    return {
      id: user.id,
      name: user.name,
      photoURL: user.photoURL ?? "",
    }
  }

  static toUser(postCommentAuthor: PostCommentAuthor): User {
    return {
      id: postCommentAuthor.id,
      name: postCommentAuthor.name,
      email: "",
      photoURL: postCommentAuthor.photoURL ?? "",
      isLocal: false,
    }
  }
}
