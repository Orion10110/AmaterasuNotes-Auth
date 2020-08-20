import { Router } from 'express'
import { signUp, signIn, signOut, refresh} from 'controllers'

const SIGN_UP_ROUTE= "/sign-up"
const SIGN_IN_ROUTE = "/sign-in"
const SIGN_OUT_ROUTE = "/sign-out"
const REFRESH_ROUTE = "/refresh"

const router = Router()

export const routes = [
    router.post(SIGN_UP_ROUTE, signUp),
    router.post(SIGN_IN_ROUTE, signIn),
    router.get(SIGN_OUT_ROUTE, signOut),
    router.post(REFRESH_ROUTE, refresh),
]
    