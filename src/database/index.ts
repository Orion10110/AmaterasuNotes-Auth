import * as mongoose from 'mongoose'
import { MONGODB_URL } from '../config'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDB = () => mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true // ??? mb need remove
})
