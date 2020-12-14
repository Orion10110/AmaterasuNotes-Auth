import * as dotenv from 'dotenv';
import { ENVType } from 'types'

dotenv.config({ path: '.env' })

export const PRODUCTION_ENV = 'production'
export const DEVELOPMENT_ENV = 'development'

export const ENV: ENVType  = process.env.NODE_ENV
export const SESSIONS_SECRET: string  = process.env.SESSIONS_SECRET
export const JWT_KEY: string  = process.env.JWT_KEY

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;

export const MONGODB_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;