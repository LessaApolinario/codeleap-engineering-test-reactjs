import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string({ error: "VITE_API_URL is required" }),
  VITE_FIREBASE_API_KEY: z.string({
    error: "VITE_FIREBASE_API_KEY is required",
  }),
  VITE_FIREBASE_AUTH_DOMAIN: z.string({
    error: "VITE_FIREBASE_AUTH_DOMAIN is required",
  }),
  VITE_FIREBASE_PROJECT_ID: z.string({
    error: "VITE_FIREBASE_PROJECT_ID is required",
  }),
  VITE_FIREBASE_STORAGE_BUCKET: z.string({
    error: "VITE_FIREBASE_STORAGE_BUCKET is required",
  }),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string({
    error: "VITE_FIREBASE_MESSAGING_SENDER_ID is required",
  }),
  VITE_FIREBASE_APP_ID: z.string({ error: "VITE_FIREBASE_APP_ID is required" }),
  VITE_FIREBASE_MEASUREMENT_ID: z.string({
    error: "VITE_FIREBASE_MEASUREMENT_ID is required",
  }),
})

const _env = envSchema.safeParse(import.meta.env)

if (!_env.success) {
  throw new Error("Invalid environment variables")
}

export const env = _env.data
