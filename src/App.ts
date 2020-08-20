import * as express from 'express'
import { Application, Router } from 'express'
import { AppParams } from './types'
import { connectToDB } from './database'

export const App = ({port, middlewares, routes}: AppParams) => {
    const app: Application = express()
    
    middlewares.forEach(middleware => app.use(middleware))
    routes.forEach(route => app.use(route))
    connectToDB();

    return app.listen(port)
}