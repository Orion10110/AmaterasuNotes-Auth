import * as mongoose from 'mongoose'
import * as validator from 'validator'

const userSchema = mongoose.Schema({
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
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
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

export const User = mongoose.model('User', userSchema)