import { createUser, getUserByCredentials, addUserToken, updateToken, findByTokenAndFingerprint, removeToken } from './user'
import { generateAuthTokens, isValidToken, decode } from './jwt'

export const signUp = async ({
    name,
    email,
    password,
    fingerprint,

}) => {
    const user = await createUser({ name, email, password })
    const token = await generateAuthTokens(user)
    const _user = await addUserToken(user, {token: token.refreshToken, fingerprint})
    _user.save()
    return token
    
}

export const signIn = async ({ email, password, fingerprint}) => {
    const user = await getUserByCredentials(email, password)
    if (!user) {
        throw new Error('Login failed! Check authentication credentials')
    }
    const token = await generateAuthTokens(user)
    const _user = await updateToken(user, {token: token.refreshToken, fingerprint })
    _user.save()
    return token
}


export const signOut = async ({refreshToken}) => {
    const { sub } = await decode(refreshToken)
    return removeToken(sub, refreshToken)
}
    

export const refresh = async ({ refreshToken, fingerprint }) => {
    const { sub } = await isValidToken(refreshToken);
    const user = await findByTokenAndFingerprint({id: sub, token: refreshToken, fingerprint})
    const token = await generateAuthTokens(user)
    const _user = await updateToken(user, {token: token.refreshToken, fingerprint })
    _user.save()

    return token
}