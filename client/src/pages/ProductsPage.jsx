import { useState } from 'react'
import './ProductsPage.css'

const MOCK_PRODUCTS = [
  { _id: '1', name: 'House Blend', price: 20.00, category: 'Blend', image: null },
  { _id: '2', name: 'Moonwalker Blend', price: 30.75, category: 'Blend', image: null },
  { _id: '3', name: 'Moka Premium Blend', price: 30.75, category: 'Blend', image: null },
  { _id: '4', name: 'Wild Child', price: 19.50, category: 'Specialty', image: null },
  { _id: '5', name: 'Head Honcho', price: 19.50, category: 'Specialty', image: null },
  { _id: '6', name: 'Smooth Talker', price: 19.50, category: 'Specialty', image: null },
  { _id: '7', name: 'Happy Chappy', price: 19.50, category: 'Specialty', image: null },
  { _id: '8', name: 'Breezy Blend', price: 17.00, category: 'Single Origin', image: null },
  { _id: '9', name: 'Seeker Blend', price: 17.00, category: 'Single Origin', image: null },
  { _id: '10', name: 'Groover Blend', price: 17.00, category: 'Single Origin', image: null },
  { _id: '11', name: 'Ola Brazil', price: 17.00, category: 'Single Origin', image: null },
  { _id: '12', name: 'Product 01', price: 30.75, category: 'Blend', image: null },
  { _id: '13', name: 'Product 01', price: 30.75, category: 'Blend', image: null },
  { _id: '14', name: 'Product 01', price: 30.75, category: 'Specialty', image: null },
  { _id: '15', name: 'Product 01', price: 30.75, category: 'Single Origin', image: null },
]

const CATEGORIES = ['View All', 'Blend', 'Specialty', 'Single Origin', 'Decaf']

const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name A–Z']

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('View All')
  const [sortBy, setSortBy] = useState('Default')
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = MOCK_PRODUCTS.filter(p =>
    activeCategory === 'View All' || p.category === activeCategory
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price
    if (sortBy === 'Price: High to Low') return b.price - a.price
    if (sortBy === 'Name A–Z') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div className="products-page">
      <div className="products-controls">
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`category-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sort-filter-row">
          <div className="sort-wrapper">
            <button className="sort-btn" onClick={() => { setSortOpen(o => !o); setFilterOpen(false) }}>
              SORT BY <span className="sort-icon">+</span>
            </button>
            {sortOpen && (
              <ul className="sort-dropdown">
                {SORT_OPTIONS.map(opt => (
                  <li
                    key={opt}
                    className={sortBy === opt ? 'active' : ''}
                    onClick={() => { setSortBy(opt); setSortOpen(false) }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="filter-btn" onClick={() => { setFilterOpen(o => !o); setSortOpen(false) }}>
            FILTER
            <svg className="filter-icon" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="3" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="6" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="products-grid">
        {sorted.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-wrapper">
              {product.image
                ? <img src={product.image} alt={product.name} className="product-image" />
                : <div className="product-image-placeholder" />
              }
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">From $ {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}