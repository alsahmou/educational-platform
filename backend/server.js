
// Variables declaration
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const router = require('express').Router()

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

// MongoDB connection, uri is captured from .env file where the key is stored then mongoose connects using it
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Defining the routers used in users.js and projects.js file
const userRouter = require('./routes/users')
const projectRouter = require('./routes/projects')
const adminProjectRouter = require('./routes/adminProjects')

router.route('/login').get((req, res) => {
  console.log('login route')
})

// router.route('/').get((req, res) => {
//   console.log(req.session)
//   if (req.session.username) {
//     req.session.username += 1
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.username + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.username = 'sasdasd'
//     res.end('welcome to the session demo. refresh!')
//   }
// })
router.route('/logout').get((req, res) => {
  console.log(req.session)
  req.session.destroy()
  res.send('asdsad')
})

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

// router.route('/about').get((req, res) => {
//   console.log('about')
//   console.log(req.session)
//   if (req.session.username) {
//     res.setHeader('Content-Type', 'text/html')
//     res.write('<p>views: ' + req.session.username + '</p>')
//     res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   } else {
//     req.session.username = 'sasdasd'
//     res.end('welcome to the session demo. refresh!')
//   }
//   console.log(req.session)
// })

app.use(router)
app.use('/users', userRouter)
app.use('/projects', projectRouter)
app.use('/adminProjects', adminProjectRouter)

// Running the application on the port previously defined
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
