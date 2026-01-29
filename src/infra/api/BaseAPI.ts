import axios, { type AxiosInstance } from "axios"
import { env } from "../../core/utils/env"

export class BaseAPI {
  private _client: AxiosInstance

  constructor() {
    this._client = axios.create({
      baseURL: env.VITE_API_URL,
    })
  }

  get client() {
    return this._client
  }
}
