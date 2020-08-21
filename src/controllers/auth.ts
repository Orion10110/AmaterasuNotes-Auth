import { Request, Response } from 'express'
import * as auth from '../services/auth'

const REFRESH_AGE = 60 * 60 * 24 * 60

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, fingerprint } : { name: string, email: string, password: string, fingerprint: string } = req.body
        const { accessToken } = await auth.signUp({
            name,
            email,
            password,
            fingerprint
        })
        res.status(201).send({ token: accessToken })
    } catch (error) {
        res.status(400).send(error)
    }

}

export const signIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, fingerprint } : { email: string, password: string, fingerprint: string } = req.body
        const { accessToken, refreshToken } = await auth.signIn({ email, password, fingerprint })
        res.cookie('refreshToken', refreshToken, {
            maxAge: REFRESH_AGE,
            httpOnly: true
        })
        res.send({ token: accessToken })
    } catch (error) {
        res.status(400).send(error)
    }
}


export const signOut = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.cookies
        await auth.signOut(refreshToken)
        res.clearCookie('refreshToken')
        res.send('success')
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


export const refresh = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.cookies
        const { fingerprint } : { fingerprint: string } = req.body
        const token = await auth.refresh({ refreshToken, fingerprint })

        res.cookie('refreshToken', token.refreshToken, {
            maxAge: REFRESH_AGE,
            httpOnly: true
        })

        res.send('success')
    } catch (error) {
        res.status(400).send(error)
    }
}
