/*
  ADMIN MIDDLEWARE — Emelina
  -------------------------
  Checks if the logged in user has the admin role.
  Always runs AFTER authMiddleware — never alone.

  HOW IT WORKS:
  - Reads req.user which authMiddleware already attached
  - Checks if req.user.role === 'admin'
  - Calls next() if true
  - Returns 403 if user is not an admin

  USED BY:
  - server/routes/userRoutes.js — GET /api/users (list all users)
  - server/routes/productRoutes.js — POST, PUT, DELETE products
  - server/routes/cartRoutes.js — GET /api/admin/carts

  EXAMPLE USAGE:
  router.get('/admin-only', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Welcome admin' })
  })

  NOTE:
  Always pair with authMiddleware first:
  [authMiddleware, adminMiddleware]
  Never use adminMiddleware alone — req.user won't exist
*/

const adminMiddleware = (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' })
    }

    // user is admin — continue
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Admin access only' })
  }
}

module.exports = adminMiddleware