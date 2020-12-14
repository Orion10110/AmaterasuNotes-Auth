import {Request, Response, IRouter, NextFunction} from 'express'

export * from './models'

export type MiddlewareType = (request: Request, response: Response, next: NextFunction) => void
export type ENVType = 'production' | 'development'


export interface AppParams {
    port: number;
    host: string;
    middlewares: MiddlewareType[];
    routes: IRouter[]
}


export interface UserCredentials {
    email: string,
    password: string,
}

export interface User extends UserCredentials{
    fingerprint: string,
}

export interface UserSignUp extends User {
    name: string,
}


export interface RefreshTokenInfo {
    refreshToken: string,
    fingerprint: string,
}

export interface TokenPairs {
    accessToken: string,
    refreshToken: string
}
