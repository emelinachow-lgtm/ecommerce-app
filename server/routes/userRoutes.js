/*
  USER ROUTES — Emelina
  --------------------
  Handles user profile management.

  ENDPOINTS:
  - GET    /api/users          — admin only, list all users
  - PUT    /api/users/:id      — update own profile
  - DELETE /api/users/:id      — delete own account

  DEPENDENCIES:
  - authMiddleware — verifies JWT, must be logged in
  - adminMiddleware — checks role === "admin"
  - User model from server/models/User.js
  - bcryptjs — rehashes password if user updates it

  CONNECTED TO:
  - client/src/pages/ProfilePage.jsx
  - client/src/pages/AdminPage.jsx
*/

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// GET /api/users — admin only, list all users
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // exclude password field from response
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/users/:id — update own profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body

    // build update object
    const updates = {}
    if (name) updates.name = name
    if (email) updates.email = email

    // hash new password if provided
    if (password) {
      updates.password = await bcrypt.hash(password, 10)
    }

    // update user and return updated document
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password')

    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/users/:id — delete own account
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'Account deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router