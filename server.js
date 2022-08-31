import express from 'express'
//middlewares
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { startCors } from './middlewares/cors.middleware'
//connection
import connection from './connection'
//routes
import routesAuth from './routes/routesAuth'
import routesUser from './routes/routesUser'
import routesTech from './routes/routesTechnology'
import routesTeam from './routes/routesTeam'
import routesPublication from './routes/routesPublication'
import routesProject from './routes/routesProject'
import routesComment from './routes/routesComment'
import routesCategory from './routes/routesCategory'

const app = express()

//Connection to DataBase
connection()

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(express.static(__dirname + '/public'))
startCors(app)
//Routes

app.use('/api', routesAuth)
app.use('/api', routesTech)
app.use('/api', routesTeam)
app.use('/api', routesPublication)
app.use('/api', routesProject)
app.use('/api', routesUser)
app.use('/api', routesComment)
app.use('/api', routesCategory)

export default app
