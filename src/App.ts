import * as express from 'express'
import { Application } from 'express'
import { AppParams } from './types'
import { connectToDB } from './database'
import { Server } from 'http'

export const App = ({port, host, middlewares, routes}: AppParams): Server => {
    const app: Application = express()

    middlewares.forEach(middleware => app.use(middleware))
    routes.forEach(route => app.use(route))
    connectToDB();

    return app.listen(port, host, () => console.log(`app listening at :${port}`))
}
