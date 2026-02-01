import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"
import type { PostComment } from "../domain/models/PostComment"

export class FirebaseToPostCommentModelMapper {
  static toDomain(
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
  ): PostComment {
    return {
      id: doc.id,
      author: {
        id: doc.data()?.author?.id ?? "",
        name: doc.data()?.author?.name ?? "",
        photoURL: doc.data()?.author?.photoURL ?? "",
      },
      post_id: Number(doc.data()?.post_id ?? ""),
      content: doc.data()?.content ?? "",
      created_at: doc.data()?.created_at ?? "",
      updated_at: doc.data()?.updated_at ?? "",
    }
  }
}
