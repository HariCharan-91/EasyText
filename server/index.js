const express = require('express')
const app = express()
const path = require('path');
require('dotenv').config()
const cors = require('cors')

// mongodb database
const connectDB = require('./db/upload')
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/image',express.static('uploads/ImageStorage'))
app.use('/api/pdf',express.static('uploads/pdfFiles'))


// importing routes
const upload_route = require('./routes/route')


// routes
app.use('/api',upload_route)

// server

const server = async() => {

    try 
    {
        await connectDB(process.env.MONGO_URL)
        app.listen(4000, () => console.log("Server is started at Port:4000"))
    }

    catch (err) {
        console.log(err)
    }
}

server()

