import {Request, Response, IRouter} from 'express'

export type MiddlewareType = (request: Request, response: Response, next) => void
export type ENVType = 'production' | 'development'

export interface AppParams { 
    port: number; 
    middlewares: MiddlewareType[];
    routes: IRouter[]
}