import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const apiKey = import.meta.env.VITE_FIRE_BASE_API_KEY
const authDomain = import.meta.env.VITE_FIRE_BASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIRE_BASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_FIRE_BASE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_FIRE_BASE_APP_ID

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
