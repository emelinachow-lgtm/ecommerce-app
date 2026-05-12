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
    name: 'House Blend',
    roaster: 'Blend',
    origin: 'Brazil, Colombia',
    price: 20.00,
    variant: '250g',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    description: 'A smooth and balanced blend, easy to love. Full-bodied with chocolaty notes and a nutty sweetness.',
    tastingNotes: 'Chocolate, Caramel, Nuts',
    coffeeProfile: 'Medium blend, Low acidity'
  },
  {
    name: 'Moonwalker Blend',
    roaster: 'Blend',
    origin: 'Ethiopia, Guatemala',
    price: 30.75,
    variant: '250g',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
    description: 'A mysterious and complex blend with bright fruity notes and a smooth finish.',
    tastingNotes: 'Blueberry, Jasmine, Dark Chocolate',
    coffeeProfile: 'Light blend, High acidity'
  },
  {
    name: 'Moka Premium Blend',
    roaster: 'Blend',
    origin: 'Yemen, Ethiopia',
    price: 30.75,
    variant: '250g',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400',
    description: 'A rich and intense blend inspired by traditional Yemeni coffee. Bold and full-bodied.',
    tastingNotes: 'Dark Chocolate, Spice, Dried Fruit',
    coffeeProfile: 'Dark blend, Low acidity'
  },
  {
    name: 'Wild Child',
    roaster: 'Cohort Coffee',
    origin: 'Ethiopia',
    price: 19.50,
    variant: '250g',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400',
    description: 'Bright and fruity with notes of blueberry and jasmine. A natural process Ethiopian that is big on personality.',
    tastingNotes: 'Blueberry, Jasmine, Brown Sugar',
    coffeeProfile: 'Light roast, High acidity'
  },
  {
    name: 'Head Honcho',
    roaster: 'Cohort Coffee',
    origin: 'Colombia',
    price: 19.50,
    variant: '250g',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    description: 'A bold and confident Colombian with a sweet caramel body and bright citrus finish.',
    tastingNotes: 'Caramel, Citrus, Milk Chocolate',
    coffeeProfile: 'Medium roast, Medium acidity'
  },
  {
    name: 'Smooth Talker',
    roaster: 'Cohort Coffee',
    origin: 'Brazil',
    price: 19.50,
    variant: '500g',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
    description: 'Smooth, creamy and approachable. A Brazilian natural with low acidity and a sweet nutty finish.',
    tastingNotes: 'Hazelnut, Milk Chocolate, Vanilla',
    coffeeProfile: 'Medium roast, Low acidity'
  },
  {
    name: 'Happy Chappy',
    roaster: 'Cohort Coffee',
    origin: 'Guatemala',
    price: 19.50,
    variant: '500g',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
    description: 'A cheerful and approachable Guatemalan with bright acidity and a clean sweet finish.',
    tastingNotes: 'Apple, Toffee, Almond',
    coffeeProfile: 'Medium roast, Medium acidity'
  },
  {
    name: 'Breezy Blend',
    roaster: 'Sacred Grounds',
    origin: 'Kenya, Ethiopia',
    price: 17.00,
    variant: '500g',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    description: 'Light and refreshing with bright berry notes and a clean crisp finish. Perfect for filter brewing.',
    tastingNotes: 'Raspberry, Lemon, Black Tea',
    coffeeProfile: 'Light roast, High acidity'
  },
  {
    name: 'Seeker Blend',
    roaster: 'Sacred Grounds',
    origin: 'Colombia, Peru',
    price: 17.00,
    variant: '1kg',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=400',
    description: 'A well-rounded blend with a smooth body and balanced sweetness. Great as espresso or filter.',
    tastingNotes: 'Brown Sugar, Walnut, Orange Peel',
    coffeeProfile: 'Medium roast, Low acidity'
  },
  {
    name: 'Groover Blend',
    roaster: 'Sacred Grounds',
    origin: 'Brazil, Colombia',
    price: 17.00,
    variant: '1kg',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400',
    description: 'A funky and complex blend that surprises with every sip. Natural process with big fruit flavours.',
    tastingNotes: 'Mango, Passionfruit, Dark Caramel',
    coffeeProfile: 'Medium-dark roast, Medium acidity'
  },
  {
    name: 'Ola Brazil',
    roaster: 'Sacred Grounds',
    origin: 'Brazil',
    price: 17.00,
    variant: '1kg',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400',
    description: 'A classic Brazilian with a smooth chocolaty body and low acidity. Perfect for milk-based drinks.',
    tastingNotes: 'Milk Chocolate, Hazelnut, Caramel',
    coffeeProfile: 'Medium-dark roast, Low acidity'
  },
  {
    name: 'Moonrise',
    roaster: 'Single Origin',
    origin: 'Ethiopia',
    price: 32.00,
    variant: '250g',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=400',
    description: 'A stunning natural Ethiopian with intense tropical fruit flavours and a winey complexity.',
    tastingNotes: 'Strawberry, Watermelon, Rose',
    coffeeProfile: 'Light roast, Very high acidity'
  },
  {
    name: 'Terra Firma',
    roaster: 'Single Origin',
    origin: 'Sumatra',
    price: 28.00,
    variant: '500g',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=400',
    description: 'An earthy and bold Sumatran with a heavy body and low acidity. A classic for dark roast lovers.',
    tastingNotes: 'Cedar, Dark Chocolate, Tobacco',
    coffeeProfile: 'Dark roast, Low acidity'
  },
  {
    name: 'Golden Hour',
    roaster: 'Single Origin',
    origin: 'Panama',
    price: 45.00,
    variant: '250g',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1519082274554-1ca37fb8abb7?w=400',
    description: 'A rare and exquisite Panamanian Geisha with extraordinary floral and tea-like complexity.',
    tastingNotes: 'Jasmine, Peach, Earl Grey',
    coffeeProfile: 'Light roast, Bright acidity'
  },
  {
    name: 'Daily Driver',
    roaster: 'Espresso Yourself',
    origin: 'Brazil, Colombia, Guatemala',
    price: 22.00,
    variant: '1kg',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
    description: 'Our house blend. Designed for everyday drinking with a smooth consistent flavour and easy drinkability.',
    tastingNotes: 'Milk Chocolate, Brown Sugar, Almond',
    coffeeProfile: 'Medium roast, Low acidity'
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