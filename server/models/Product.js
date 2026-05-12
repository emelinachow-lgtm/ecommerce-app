/*
  PRODUCT MODEL — Shraddha
  -------------------------
  Mongoose schema for the Product collection.

  FIELDS:
  - name: product name e.g. "Wild Child"
  - roaster: brand/roaster name e.g. "Cohort Coffee"
  - origin: country of origin e.g. "Ethiopia"
  - price: price in AUD
  - variant: size and grind e.g. "1kg / Whole Bean"
  - stock: number available
  - image: URL to product image
  - description: product description
  - tastingNotes: e.g. "Chocolate, Caramel, Nuts"
  - coffeeProfile: e.g. "Medium blend, Low acidity"
  - createdAt: auto set when product is created

  USED BY:
  - server/routes/productRoutes.js
  - server/models/Cart.js — cart items reference product by id
*/

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  roaster: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  variant: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tastingNotes: {
    type: String,
    trim: true,
    default: ''
  },
  coffeeProfile: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)