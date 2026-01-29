import {
  initializeApp,
  type FirebaseApp,
  type FirebaseOptions,
} from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { Firestore, getFirestore } from "firebase/firestore"
import { env } from "../../core/utils/env"

export class BaseFirebaseRepository {
  private _firebaseConfig: FirebaseOptions
  private _app: FirebaseApp
  private _auth: Auth
  private _database: Firestore

  constructor() {
    this._firebaseConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
    }
    this._app = initializeApp(this._firebaseConfig)
    this._auth = getAuth(this._app)
    this._database = getFirestore(this._app)
  }

  get app() {
    return this._app
  }

  get auth() {
    return this._auth
  }

  get database() {
    return this._database
  }
}
