/*
  SERVER ENTRY POINT
  ------------------
  Initialises Express, connects to MongoDB Atlas,
  and registers all API route groups.

  ROUTES:
  - /api/auth     — register and login
  - /api/users    — user profile management
  - /api/products — product CRUD
  - /api/cart     — cart management
*/

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))