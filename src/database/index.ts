import * as mongoose from 'mongoose'
import { MONGODB_URL } from '../config'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true // ??? mb need remove
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectToDB = () => mongoose.connect(MONGODB_URL, options)
