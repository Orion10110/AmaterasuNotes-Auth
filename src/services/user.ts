import * as bcrypt from 'bcryptjs'
import { User } from '../models'
import { UserCredentials, UserSignUp, IUser } from '../types'

export const createUser = async ({ name, email, password }: UserSignUp): Promise<IUser> => {
    try {
        const _password = await bcrypt.hash(password, 8)
        const user = new User({ name, email, password: _password })
        return user
    } catch (e) {
        throw e
    }
}

export const getUserByCredentials = async ({ email, password} : UserCredentials): Promise<IUser>  => {
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

export const getUserById = async (id: string): Promise<IUser> => {
    const user = await User.findOne({ _id: id })
    if (!user) {
        throw new Error('Invalid user id')
    }

    return user
}

export const removeUserById = async (id: string): Promise<number|undefined> => {
    try {
        const result = await User.remove({ _id: id })
        return result.deletedCount
    } catch (e) {
        throw e
    }
}

export const updateToken = async (user: IUser, { token, fingerprint }: { token: string, fingerprint: string}): Promise<IUser> => {
    const lastToken = user.tokens.find(token => fingerprint === token.fingerprint)
    if(!lastToken) {
        user.tokens = [{ token, fingerprint }]
    } else {
        user.tokens = user.tokens.map(item => item.fingerprint === fingerprint ? { token, fingerprint } : item)
    }

    return user
}

export const addUserToken = async (user: IUser, tokenInfo: { token: string, fingerprint: string }): Promise<IUser> => {
    const { tokens } = user
    if(tokens.length) {

    }
    user.tokens = tokens.length >= 5 ? [...tokens.slice(1), tokenInfo] : [...tokens, tokenInfo]
    return user
}

export const removeToken = async (id: string, token: string): Promise<number> => {
    const result = await User.updateOne({_id: id }, { $pull: {tokens: { token } } })
    return result.nModified
}

export const findByTokenAndFingerprint = async ({id, token, fingerprint}: {id: string, token: string, fingerprint: string}): Promise<IUser| null> => {
    const user = await User.findOne({ id, tokens: { $elemMatch: { token, fingerprint } } })
    return user
}
