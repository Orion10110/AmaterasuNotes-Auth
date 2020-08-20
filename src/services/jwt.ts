import * as jwt from 'jsonwebtoken'
import { JWT_KEY } from 'config'

export const generateAuthTokens = async user => {
    const accessToken = jwt.sign({ name: user.name }, JWT_KEY, { subject: user.id,  expiresIn: 30, issuer: 'amaterasu-notes_auth'  })
    const refreshToken = jwt.sign({}, JWT_KEY, { subject: user.id,  expiresIn: "60 days", issuer: 'amaterasu-notes_auth'  })
    
    return  {
        accessToken,
        refreshToken
    }
}

export const isValidToken = async token => {
    try {
        const decoded = await jwt.verify(token, JWT_KEY)
        return decoded
    } catch (e) {
        throw e
    }
}

export const decode = async token => jwt.decode(token)