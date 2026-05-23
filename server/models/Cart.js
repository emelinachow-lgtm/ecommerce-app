/*
  CART MODEL — Emelina
  ---------------------
  Defines the Cart database schema using Mongoose.

  STRUCTURE:
  - Each user has ONE cart (enforced by unique: true on user field)
  - Each cart has an array of items
  - Each item references a Product and has a quantity

  NOTES:
  - cartItemSchema is a sub-schema — it lives inside Cart, not its own collection
  - updatedAt auto-updates on every cart.save() via the pre-save hook
  - min: 1 on quantity means you can never have 0 of an item — remove the item instead
  - unique: true on user means one cart per user only — adding items updates existing cart

  CONNECTED TO:
  - server/routes/cartRoutes.js — all cart API endpoints import this model
  - GET /api/cart — finds cart by user id
  - POST /api/cart — creates or updates cart
  - PUT /api/cart/:itemId — updates item quantity
  - DELETE /api/cart/:itemId — removes item from cart
  - GET /api/admin/carts — returns all carts (admin only)
*/

const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Auto-update updatedAt every time cart is saved
cartSchema.pre('save', async function() {
  this.updatedAt = Date.now()
})

module.exports = mongoose.model('Cart', cartSchema)