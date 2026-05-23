/*
  PRODUCT ROUTES — Shraddha
  --------------------------
  Handles all product-related API endpoints.

  ENDPOINTS:
  - GET    /api/products           — get all products, supports ?search= query
  - GET    /api/products/:id       — get single product by id
  - POST   /api/products           — create product (admin only)
  - PUT    /api/products/:id       — update product (admin only)
  - DELETE /api/products/:id       — delete product (admin only)

  DEPENDENCIES:
  - authMiddleware — verifies JWT
  - adminMiddleware — checks role === "admin"
  - Product model from server/models/Product.js

  CONNECTED TO:
  - client/src/pages/ProductsPage.jsx
  - client/src/pages/ProductDetailPage.jsx
  - client/src/pages/AdminPage.jsx
*/

const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// GET /api/products — get all products, supports ?search= query
router.get('/', async (req, res) => {
  try {
    const { search } = req.query

    // if search term provided filter by name, roaster or origin
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { roaster: { $regex: search, $options: 'i' } },
            { origin: { $regex: search, $options: 'i' } }
          ]
        }
      : {}

    const products = await Product.find(query)
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/products/:id — get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/products — create product (admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, roaster, origin, price, variant, stock, image, description } = req.body

    if (!name || !roaster || !origin || !price || !variant || !stock || !image || !description) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const product = new Product({ name, roaster, origin, price, variant, stock, image, description })
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/products/:id — update product (admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/products/:id — delete product (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router