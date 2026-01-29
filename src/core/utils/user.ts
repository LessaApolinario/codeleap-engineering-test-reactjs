import { v4 as uuidv4 } from "uuid"
import type { User } from "../domain/models/User"

export function createLocalUserFromUsername(username: string): User {
  return {
    id: uuidv4(),
    email: "",
    name: username,
    photoURL: "",
    isLocal: true,
  }
}
