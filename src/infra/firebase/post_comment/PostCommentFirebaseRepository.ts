import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import type { PostComment } from "../../../core/domain/models/PostComment"
import type { CreatePostCommentRequest } from "../../../core/domain/types/request/post_comment/create-post-comment-request"
import type { EditPostCommentRequest } from "../../../core/domain/types/request/post_comment/edit-post-comment-request"
import type { DefaultPostResponse } from "../../../core/domain/types/response/default/DefaultPostResponse"
import type { PostCommentRepository } from "../../../core/interfaces/repositories/PostCommentRepository"
import { FirebaseToPostCommentModelMapper } from "../../../core/mappers/firebase-to-post-comment-model.mapper"
import { BaseFirebaseRepository } from "../BaseFirebaseRepository"

export class PostCommentFirebaseRepository
  extends BaseFirebaseRepository
  implements PostCommentRepository
{
  async create(
    postCommentRequest: CreatePostCommentRequest,
  ): Promise<DefaultPostResponse> {
    const postCommentsRef = collection(this.database, "post_comments")

    const payload = {
      ...postCommentRequest,
      created_at: serverTimestamp(),
    }

    const { id } = await addDoc(postCommentsRef, payload)
    return { id }
  }

  async fetchByPostId(postId: number): Promise<PostComment[]> {
    const postCommentsRef = collection(this.database, "post_comments")
    const postCommentsQuery = query(
      postCommentsRef,
      where("post_id", "==", postId),
    )

    const postComments = await getDocs(postCommentsQuery)
    return postComments.docs.map(FirebaseToPostCommentModelMapper.toDomain)
  }

  async edit(postCommentRequest: EditPostCommentRequest): Promise<void> {
    const postCommentsRef = doc(
      this.database,
      `post_comments/${postCommentRequest.id}`,
    )

    const payload = {
      content: postCommentRequest.content,
      author: {
        id: postCommentRequest.author.id,
        name: postCommentRequest.author.name,
      },
      post_id: postCommentRequest.post_id,
      updated_at: serverTimestamp(),
    }

    await updateDoc(postCommentsRef, payload)
  }

  async remove(id: string): Promise<void> {
    const postCommentsRef = doc(this.database, `post_comments/${id}`)
    await deleteDoc(postCommentsRef)
  }
}
