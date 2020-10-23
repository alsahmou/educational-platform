
// Variables declaration
const router = require('express').Router()
const User = require('../models/user.model')
const Bcrypt = require('bcryptjs')

// Find all users functions, to be adjusted accordingly in the project for future usage
router.route('/').get((req, res) => {
  console.log('req session username in req function', req.session.username)
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Add user function, the user object is created using the following parameters that are passed through the request body
router.route('/add').post((req, res) => {
  const username = req.body.username
  const password = Bcrypt.hashSync(req.body.password, 10)
  const name = req.body.name
  const aboutMe = req.body.aboutMe
  const profilePicture = req.body.profilePicture
  const securityAnswer1 = req.body.securityAnswer1
  const securityAnswer2 = req.body.securityAnswer2
  const securityAnswer3 = req.body.securityAnswer3
  const isAdmin = req.body.isAdmin

  const newUser = new User({
    username,
    password,
    name,
    aboutMe,
    profilePicture,
    securityAnswer1,
    securityAnswer2,
    securityAnswer3,
    isAdmin
  })

  // Saves the new user to the DB unless there is an error which shows
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Finds a user using their username, returns the user object unless there is an error which shows
router.route('/dashboard').get((req, res) => {
  console.log('req session username in userdashboard', req.session.username)
  User.findOne({ username: req.session.username })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error :' + err))
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

// Finds a user using their username, returns the user object unless there is an error which shows
router.route('/:username/:password').get((req, res) => {
  req.session.username = req.params.username

  User.find({ username: req.params.username, password: req.params.password })
    .then(user => {
      return res.json(user)
    })
    .catch(err => res.status(400).json('Error :' + err))
})

// Delete user function, to be adjusted accordingly in the project for future usage
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json('Deleted!'))
    .catch(err => res.status(400).json('Error :' + err))
})

// Update user function, to be adjusted accordingly in the project for future usage
router.route('/update/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(user => {
      user.aboutMe = req.body.aboutMe
      user.profilePicture = req.body.profilePicture
      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error :' + err))
    })
    .catch(err => res.status(400).json('Error :' + err))
})

module.exports = router
