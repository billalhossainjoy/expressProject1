const express = require('express')
const path = require('path')
const contactRoute = require('./routes/contactRoute')
const errorHandler = require('./middlewares/errorHandling')
const connectDB = require('./config/dbConnect')
const userRoute = require('./routes/userRoute')

const app = express()

connectDB()

app.config = {
    port: process.env.port || 8080,
    host: '192.168.0.1'
}

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json())
app.use('/api/contact',contactRoute)
app.use('/api/users',userRoute)
app.use(errorHandler)

app.set('view engine','ejs')


app.listen(app.config.port,app.config.host,(req,res)=>{
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})