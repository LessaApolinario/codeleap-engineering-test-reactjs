import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import type { PostComment } from "../domain/models/PostComment"

export class FirebaseToPostCommentModelMapper {
  static toDomain(
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
  ): PostComment {
    return {
      id: doc.id,
      author: {
        id: String(doc.data()["author"]["id"] ?? ""),
        name: String(doc.data()["author"]["name"] ?? ""),
        photoURL: String(doc.data()["author"]["photoURL"] ?? ""),
      },
      post_id: String(doc.data()["post_id"] ?? ""),
      content: String(doc.data()["content"] ?? ""),
      created_at: String(doc.data()["created_at"] ?? ""),
      updated_at: String(doc.data()["updated_at"] ?? ""),
    }
  }
}
