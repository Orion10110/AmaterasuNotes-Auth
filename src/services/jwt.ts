import * as jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config'
import { IUser, TokenPairs } from 'types'

export const generateAuthTokens = async (user: IUser): Promise<TokenPairs>  => {
    const accessToken = jwt.sign({ name: user.name }, JWT_KEY, { subject: user.id,  expiresIn: 30, issuer: 'amaterasu-notes_auth'  })
    const refreshToken = jwt.sign({}, JWT_KEY, { subject: user.id,  expiresIn: "60 days", issuer: 'amaterasu-notes_auth'  })

    return  {
        accessToken,
        refreshToken
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isValidToken = async (token: string): Promise<string|object> => {
    try {
        const decoded = await jwt.verify(token, JWT_KEY)
        return decoded
    } catch (e) {
        throw e
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decode = async (token: string): Promise<string | { [key: string]: any; } | null>  => jwt.decode(token)
