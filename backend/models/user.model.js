const mongoose = require('mongoose')
const Schema = mongoose.Schema

// User model is declared with the parameters included in it, only the username is unique and will be used as the key to the DB
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  aboutMe: {
    type: String
  },
  profilePicture: {
    type: String
  },
  securityAnswer1: {
    type: String,
    required: true
  },
  securityAnswer2: {
    type: String,
    required: true
  },
  securityAnswer3: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
