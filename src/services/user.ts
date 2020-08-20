import * as bcrypt from 'bcryptjs'
import { User } from 'models'

export const createUser = async ({ name, email, password }) => {
    try {
        const _password = await bcrypt.hash(password, 8)
        const user = new User({ name, email, password: _password })
        return user
    } catch (e) {
        throw e
    }
}

export const getUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Invalid login or password')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }

    return user
}

export const getUserById = async id => {
    const user = await User.findOne({ _id: id })
    if (!user) {
        throw new Error('Invalid user id')
    }

    return user
}

export const removeUserById = async id => {
    try {
        const result = await User.remove({ _id: id })  
        return result
    } catch (e) {
        throw e
    }
}

export const updateToken = async (user, { token, fingerprint }) => {
    const lastToken = user.tokens.find(token => fingerprint === token.fingerprint)
    if(!lastToken) {
        user.tokens = [{ token, fingerprint }]
    } else {
        user.tokens = user.tokens.map(item => item.fingerprint === fingerprint ? { token, fingerprint } : item)
    }

    return user
}

export const addUserToken = async (user, tokenInfo: { token: string, fingerprint: string }) => {
    const { tokens } = user
    if(tokens.length) {
        
    }
    user.tokens = tokens.length >= 5 ? [...tokens.slice(1), tokenInfo] : [...tokens, tokenInfo]
    return user
}

export const removeToken = async (id, token) => {
    return User.updateOne({_id: id }, { $pull: {tokens: { token } } })
}

export const findByTokenAndFingerprint = async ({id, token, fingerprint}) => {
    const user = await User.findOne({ tokens: { $elemMatch: { token, fingerprint } } })
    console.log(user, id)
    return user
}