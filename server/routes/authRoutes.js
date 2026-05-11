/*
  AUTH ROUTES — Emelina
  --------------------
  Handles user registration and login.

  ENDPOINTS:
  - POST /api/auth/register — create new account, return JWT
  - POST /api/auth/login    — verify credentials, return JWT

  DEPENDENCIES:
  - bcryptjs — hashes passwords before saving
  - jsonwebtoken — creates JWT on successful auth
  - User model from server/models/User.js

  CONNECTED TO:
  - client/src/pages/LoginPage.jsx
  - client/src/pages/RegisterPage.jsx
  - client/src/context/AuthProvider.jsx — stores JWT in state
*/

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// helper — generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // check all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // create and save new user
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    // return JWT and user info
    const token = generateToken(user)
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // check all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // return JWT and user info
    const token = generateToken(user)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router