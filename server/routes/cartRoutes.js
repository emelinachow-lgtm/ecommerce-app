/*
  CART ROUTES — Emelina
  ----------------------
  Handles all cart-related API endpoints.

  DEPENDENCIES:
  - Requires authMiddleware from Sahil (server/middleware/authMiddleware.js)
  - Requires adminMiddleware from Sahil (server/middleware/adminMiddleware.js)
  - Requires Cart model from server/models/Cart.js
  - All routes except admin are protected — user must be logged in

  ENDPOINTS:
  - GET    /api/cart              — get logged in user's cart
  - POST   /api/cart              — add item to cart
  - PUT    /api/cart/:itemId      — update item quantity
  - DELETE /api/cart/:itemId      — remove item from cart
  - GET    /api/admin/carts       — get all users' carts (admin only)

  TO DO:
  - Test all routes in Thunder Client once Sahil pushes auth middleware
  - Connect frontend CartPage and CartSidebar to these routes in Week 3
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
    // if no cart found return empty cart object
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
      // otherwise add as new item
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
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

// GET /api/admin/carts — get all users' carts (admin only)
router.get('/admin/carts', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('user', 'name email') // get user name and email only
      .populate('items.product')      // get full product details
    res.json(carts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router