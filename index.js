import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoute from './Routes/UserRoute.js'
import AuthRoute from './Routes/AuthRoute.js'
const app=express()


// routes
 
// middleware
app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))

dotenv.config()

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser:true, useUnifiedTopology: true
}).then(()=>app.listen(process.env.PORT , ()=> console.log('listening'))).catch((error)=>console.log(error))

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)