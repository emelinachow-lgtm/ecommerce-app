/*
  CART ROUTES — Emelina
  ----------------------
  Handles all cart-related API endpoints.

  ENDPOINTS:
  - GET    /api/cart              — get logged in user's cart
  - POST   /api/cart              — add item to cart
  - PUT    /api/cart/:itemId      — update item quantity
  - DELETE /api/cart/:itemId      — remove item from cart
  - GET    /api/cart/admin/carts  — get all users' carts (admin only)

  DEPENDENCIES:
  - authMiddleware — verifies JWT, user must be logged in
  - adminMiddleware — checks role === "admin"
  - Cart model from server/models/Cart.js
*/

const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// GET /api/cart — get logged in user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product')
    if (!cart) return res.json({ items: [] })
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/cart — add item to cart
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    let cart = await Cart.findOne({ user: req.user.id })

    // create new cart if user doesn't have one yet
    if (!cart) cart = new Cart({ user: req.user.id, items: [] })

    // if product already in cart increase quantity
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    )
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    await cart.populate('items.product')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/cart/:itemId — update item quantity
router.put('/:itemId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    // find the specific item by its id
    const item = cart.items.id(req.params.itemId)
    if (!item) return res.status(404).json({ message: 'Item not found' })

    item.quantity = req.body.quantity
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/cart/:itemId — remove item from cart
router.delete('/:itemId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    if (!cart) return res.status(404).json({ message: 'Cart not found' })

    // filter out the item to remove
    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    )
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/cart/admin/carts — get all users' carts (admin only)
router.get('/admin/carts', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('user', 'name email')
      .populate('items.product')
    res.json(carts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router