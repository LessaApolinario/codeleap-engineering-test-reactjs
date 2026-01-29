import axios from "axios"
import { env } from "../../core/utils/env"

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
})
