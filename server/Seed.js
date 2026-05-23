/*
  SEED SCRIPT
  -----------
  Populates the database with product data.

  HOW TO RUN:
  cd server
  node seed.js
*/

require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  {
    name: 'Wild Child',
    roaster: 'Cohort Coffee',
    origin: 'Brazil, Colombia',
    price: 19.50,
    variant: '250g',
    stock: 60,
    image: 'http://cohortcoffee.com.au/cdn/shop/products/FP-021.jpg?v=1671488443',
    description: 'Bold and approachable blend with rich chocolate notes and a smooth finish. Perfect for strong morning coffee and classic espresso.',
    tastingNotes: 'Caramel, Cocoa, Toasted Nuts',
    coffeeProfile: 'Blend, Medium-Strong, Full body, Low acidity'
  },
  {
    name: 'Head Honcho',
    roaster: 'Cohort Coffee',
    origin: 'Indonesia, Brazil',
    price: 19.50,
    variant: '250g',
    stock: 45,
    image: 'http://cohortcoffee.com.au/cdn/shop/products/FP-019.jpg?v=1671488337',
    description: 'Darker roast with depth and intensity. A strong coffee with bitter-sweet flavours and a high caffeine feel.',
    tastingNotes: 'Dark Chocolate, Molasses, Spice',
    coffeeProfile: 'Blend, Strong, Heavy body, Low acidity'
  },
  {
    name: 'Smooth Talker',
    roaster: 'Cohort Coffee',
    origin: 'Brazil',
    price: 19.50,
    variant: '500g',
    stock: 55,
    image: 'http://cohortcoffee.com.au/cdn/shop/products/FP-022.jpg?v=1671488254',
    description: 'Mellow, balanced blend perfect for daily use. Smooth coffee ideal for milk drinks with subtle sweetness.',
    tastingNotes: 'Milk Chocolate, Almond, Honey',
    coffeeProfile: 'Blend, Medium, Smooth body, Medium-Low acidity'
  },
  {
    name: 'Happy Chappy',
    roaster: 'Cohort Coffee',
    origin: 'Ethiopia, Colombia',
    price: 19.50,
    variant: '500g',
    stock: 50,
    image: 'http://cohortcoffee.com.au/cdn/shop/products/FP-017.jpg?v=1671488532',
    description: 'Bright, playful blend with fruit notes. Balanced coffee with slight brightness — not too heavy.',
    tastingNotes: 'Citrus, Caramel, Stone Fruit',
    coffeeProfile: 'Blend, Medium, Light-Medium body, Medium acidity'
  },
  {
    name: 'Breezy Blend',
    roaster: 'Sacred Grounds',
    origin: 'Ethiopia',
    price: 17.00,
    variant: '500g',
    stock: 40,
    image: 'https://assets.woolworths.com.au/images/1005/785137.jpg?impolicy=wowsmkqiema&w=600&h=600',
    description: 'Bright, lively single-origin style coffee. Light coffee with fruity flavours perfect for filter brewing.',
    tastingNotes: 'Tropical Fruit, Citrus, Floral',
    coffeeProfile: 'Arabica, Light, Light body, High acidity'
  },
  {
    name: 'Seeker Blend',
    roaster: 'Sacred Grounds',
    origin: 'Colombia, Ethiopia',
    price: 17.00,
    variant: '1kg',
    stock: 30,
    image: 'https://assets.woolworths.com.au/images/1005/6022515.jpg?impolicy=wowsmkqiema&w=600&h=600',
    description: 'Well-rounded blend with sweetness and fruit. Balanced flavour with slight fruitiness — versatile for espresso or filter.',
    tastingNotes: 'Red Berries, Caramel, Cocoa',
    coffeeProfile: 'Arabica Blend, Medium, Medium body, Medium acidity'
  },
  {
    name: 'Groover Blend',
    roaster: 'Sacred Grounds',
    origin: 'Brazil, Peru',
    price: 17.00,
    variant: '1kg',
    stock: 35,
    image: 'https://assets.woolworths.com.au/images/1005/757409.jpg?impolicy=wowsmkqiema',
    description: 'Smooth but rich blend for milk-based drinks. Strong coffee with rich flavour and low acidity.',
    tastingNotes: 'Dark Chocolate, Toffee, Roasted Nuts',
    coffeeProfile: 'Blend, Medium-Strong, Full body, Low acidity'
  },
  {
    name: 'Ola Brazil',
    roaster: 'Sacred Grounds',
    origin: 'Brazil',
    price: 17.00,
    variant: '1kg',
    stock: 45,
    image: 'https://assets.woolworths.com.au/images/1005/784932.jpg?impolicy=wowsmkqiema',
    description: 'Smooth, nutty single-origin Brazilian coffee. Classic coffee with nutty sweetness and low acidity.',
    tastingNotes: 'Chocolate, Hazelnut, Brown Sugar',
    coffeeProfile: 'Arabica, Medium, Medium-Full body, Low acidity'
  },
  {
    name: 'House Blend',
    roaster: 'Mecca Coffee',
    origin: 'Brazil, Colombia',
    price: 20.00,
    variant: '250g',
    stock: 50,
    image: 'https://www.mecca.coffee/cdn/shop/files/MeccaCoffeeHouseBlendMain1kg600x750_627b8676-23e4-4f9c-b490-f6183a8ccb9b.webp?v=1765942350&width=960',
    description: 'Classic, consistent house blend. Everyday coffee that is balanced and not too strong.',
    tastingNotes: 'Chocolate, Caramel, Nuts',
    coffeeProfile: 'Blend, Medium, Medium body, Low acidity'
  },
  {
    name: 'Moonwalker Blend',
    roaster: 'Mecca Coffee',
    origin: 'Ethiopia, Colombia',
    price: 30.75,
    variant: '250g',
    stock: 40,
    image: 'https://www.mecca.coffee/cdn/shop/files/MoonwalkerBlendMain600x750.webp?v=1765942253&width=960',
    description: 'Modern blend with brighter notes. Fruity coffee with a unique flavour profile perfect for filter and pour-over.',
    tastingNotes: 'Berry, Citrus, Chocolate',
    coffeeProfile: 'Blend, Medium, Medium body, Medium acidity'
  },
  {
    name: 'Moka Premium Blend',
    roaster: 'Mecca Coffee',
    origin: 'Yemen, Ethiopia',
    price: 30.75,
    variant: '250g',
    stock: 35,
    image: 'https://www.mecca.coffee/cdn/shop/files/MeccaCoffeeMokaBlendMain1kg.webp?v=1765942263&width=960',
    description: 'Traditional-inspired blend with deep flavour. Bold coffee with complex taste — great for espresso and moka pot.',
    tastingNotes: 'Cocoa, Spice, Dark Fruit',
    coffeeProfile: 'Blend, Medium-Strong, Full body, Medium-Low acidity'
  },
  {
    name: 'Shady Lane',
    roaster: 'Wide Open Rd',
    origin: 'Ethiopia, Nicaragua, Brazil',
    price: 22.00,
    variant: '250g',
    stock: 30,
    image: 'https://wideopenroad.com.au/cdn/shop/files/wide_shadylane_250.png?v=1722904834&width=800',
    description: 'Bold and comforting espresso with deep chocolate notes balanced by subtle cherry sweetness. Perfect for rich espresso and flat whites.',
    tastingNotes: 'Dark Chocolate, Cherry, Vanilla',
    coffeeProfile: 'Espresso blend, Medium-Strong, Smooth body, Sweet finish'
  },
  {
    name: 'Bathysphere',
    roaster: 'Wide Open Rd',
    origin: 'Colombia, Nicaragua, El Salvador',
    price: 24.00,
    variant: '250g',
    stock: 30,
    image: 'https://wideopenroad.com.au/cdn/shop/files/wide_bathysphere_250.png?v=1722994100&width=800',
    description: 'Balanced and versatile blend with creamy chocolate notes and soft fruit complexity. Great for everyday espresso and milk drinks.',
    tastingNotes: 'Milk Chocolate, Caramel, Stone Fruit',
    coffeeProfile: 'Espresso blend, Medium, Balanced acidity, Caramel sweetness'
  },
  {
    name: 'Moon Pix',
    roaster: 'Wide Open Rd',
    origin: 'Colombia, Nicaragua',
    price: 25.00,
    variant: '250g',
    stock: 25,
    image: 'https://wideopenroad.com.au/cdn/shop/files/wide_moonpix_250.png?v=1722994100&width=800',
    description: 'Delicate filter coffee with vibrant berry notes and syrupy sweetness. Ideal for filter, pour over and AeroPress.',
    tastingNotes: 'Raspberry, Golden Syrup',
    coffeeProfile: 'Filter roast, Light-Medium body, Bright acidity, Fruity profile'
  },
  {
    name: 'Yoshimi',
    roaster: 'Wide Open Rd',
    origin: 'Ethiopia',
    price: 26.00,
    variant: '250g',
    stock: 25,
    image: 'https://wideopenroad.com.au/cdn/shop/files/YOSHIMI_420c29e4-3e02-4726-bc6c-2d0e04c1c7d8.png?v=1769988929&width=800',
    description: 'Bright and expressive filter coffee with layered citrus and floral characteristics. Perfect for adventurous drinkers who enjoy tea-like profiles.',
    tastingNotes: 'Mandarin, Hibiscus, Lime Meringue',
    coffeeProfile: 'Filter roast, Light body, High acidity, Floral and citrus profile'
  }
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    await Product.deleteMany({})
    console.log('Existing products cleared')

    await Product.insertMany(products)
    console.log(`${products.length} products seeded successfully`)

    mongoose.connection.close()
  } catch (err) {
    console.error('Seed error:', err)
    mongoose.connection.close()
  }
}

seed()