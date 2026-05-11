/*
  USER MODEL — Emelina
  -------------------
  Mongoose schema for the User collection.

  FIELDS:
  - name: full name of the user
  - email: unique, stored lowercase
  - password: hashed with bcrypt before saving — never stored as plain text
  - role: "user" (default) or "admin"
  - createdAt: auto set when user is created

  USED BY:
  - server/routes/authRoutes.js — register and login
  - server/routes/userRoutes.js — get, update, delete users
  - server/middleware/authMiddleware.js — verify JWT
  - server/models/Cart.js — cart references user by id
*/

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)