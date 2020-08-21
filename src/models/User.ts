import * as mongoose from 'mongoose';
import { IUser } from '../types'
import isEmail from 'validator/lib/isEmail';



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value: string) => {
                return isEmail(value)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        fingerprint: {
            type: String,
            required: true
        }
    }]
})

export const User = mongoose.model<IUser>('User', UserSchema)
