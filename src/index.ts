import { App } from './App'
import * as morgan from "morgan"
import * as bodyParser from 'body-parser'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { ENV, DEVELOPMENT_ENV, SESSIONS_SECRET } from './config'
import { routes } from './routes'

const httpLogerMiddleware = (ENV === DEVELOPMENT_ENV && [
    morgan('dev')
] || [])

const sessionMiddleware =   session({
    cookieName: 'refreshToken',
    secret: SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true,
    httpOnly: true,
    secure: false,
})


const app = App({
    port: 3000,
    routes,
    middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        ...httpLogerMiddleware,
        sessionMiddleware,
        cookieParser()
    ]
})