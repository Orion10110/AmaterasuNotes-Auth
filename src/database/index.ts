import * as mongoose from 'mongoose'
import { MONGODB_URL } from 'config'

export const connectToDB = () => mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true // ??? mb need remove
})
