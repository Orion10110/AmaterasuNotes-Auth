import { createUser, getUserByCredentials, addUserToken, updateToken, findByTokenAndFingerprint, removeToken } from './user'
import { generateAuthTokens, isValidToken, decode } from './jwt'
import { UserSignUp, User, RefreshTokenInfo, TokenPairs } from '../types'

export const signUp = async (userInfo : UserSignUp): Promise<TokenPairs> => {
    const { fingerprint } = userInfo
    const user = await createUser(userInfo)
    const token = await generateAuthTokens(user)
    const _user = await addUserToken(user, {token: token.refreshToken, fingerprint})
    _user.save()
    return token
}

export const signIn = async ({ email, password, fingerprint}: User): Promise<TokenPairs> => {
    const user = await getUserByCredentials({ email, password })
    if (!user) {
        throw new Error('Login failed! Check authentication credentials')
    }
    const token = await generateAuthTokens(user)
    const _user = await updateToken(user, {token: token.refreshToken, fingerprint })
    _user.save()
    return token
}


export const signOut = async (refreshToken: string): Promise<number|null> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { sub }: any = await decode(refreshToken)
    return removeToken(sub, refreshToken)
}


export const refresh = async ({ refreshToken, fingerprint }: RefreshTokenInfo): Promise<TokenPairs>  => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { sub }: any = await isValidToken(refreshToken);
    const user = await findByTokenAndFingerprint({id: sub, token: refreshToken, fingerprint})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = await generateAuthTokens(user!)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const _user = await updateToken(user!, {token: token.refreshToken, fingerprint })
    _user.save()

    return token
}
