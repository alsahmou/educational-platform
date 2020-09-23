// Variables declaration
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// MongoDB connection, uri is captured from .env file where the key is stored then mongoose connects using it
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Defining the routers used in users.js file
const userRouter = require('./routes/users')

app.use('/users', userRouter)

// Running the application on the port previously defined
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
