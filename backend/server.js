// Variables declaration
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const router = require('express').Router()

require('dotenv').config()

// Express app creation and port defintion
const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

// MongoDB connection, uri is captured from .env file where the key is stored then mongoose connects using it
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Defining the routers used across the application
const userRouter = require('./routes/users')
const projectRouter = require('./routes/projects')
const adminProjectRouter = require('./routes/adminProjects')

// Logout route to end current session
router.route('/logout').get((req, res) => {
  req.session.destroy()
  res.send('Session deleted')
})

// Session creation with session length imported from .env file
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: parseInt(process.env.SESSION_LENGTH) } }))

// Using the routes inside the applicatioj
app.use(router)
app.use('/users', userRouter)
app.use('/projects', projectRouter)
app.use('/adminProjects', adminProjectRouter)

// Running the application on the port previously defined
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
