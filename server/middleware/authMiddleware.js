/*
  AUTH MIDDLEWARE — Emelina
  ------------------------
  Verifies JWT on every protected route.
  Must run before any route that requires a logged in user.

  HOW IT WORKS:
  - Reads the Authorization header from the request
  - Checks it starts with "Bearer "
  - Extracts and verifies the token using JWT_SECRET
  - Attaches decoded user payload to req.user
  - Calls next() if valid
  - Returns 401 if token is missing or invalid

  USED BY:
  - server/routes/userRoutes.js
  - server/routes/cartRoutes.js
  - server/routes/productRoutes.js (admin routes)

  EXAMPLE USAGE:
  router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.id}` })
  })
*/

const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    // get the authorization header
    const authHeader = req.headers.authorization

    // check it exists and starts with Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorised — no token provided' })
    }

    // extract the token
    const token = authHeader.split(' ')[1]

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // attach decoded user to request
    req.user = decoded

    // move to the next middleware or route
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Not authorised — invalid token' })
  }
}

module.exports = authMiddleware