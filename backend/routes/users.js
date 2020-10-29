
// Variables declaration
const router = require('express').Router()
const User = require('../models/user.model')
const Bcrypt = require('bcryptjs')

// Find all users functions, to be adjusted accordingly in the project for future usage
router.route('/').get((req, res) => {
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

// Finds a user using their username in the session, returns the user object unless there is an error which shows
router.route('/getinfo').get((req, res) => {
  User.findOne({ username: req.session.username })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error :' + err))
})

// Finds a user using their username, returns the user object unless there is an error which shows
// Session username is set after a user is found to the user's username and the password is confirmed
// Bcrypt compare is used to compare input password with encrypted password in the DB
router.route('/:username/:password').get((req, res) => {
  User.find({ username: req.params.username })
    .then(user => {
      Bcrypt.compare(req.params.password, user[0].password, function (err, response) {
        if (err) {
          console.log('error')
        }
        if (response) {
          req.session.username = req.params.username
          return res.json(user)
        }
        else {
          return res.json([])
        }
      })
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
