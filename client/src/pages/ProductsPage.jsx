/*
  PRODUCTS PAGE — Shraddha
  -------------------------
  Displays all products in a grid with live search and category filters.

  DEPENDENCIES:
  - api.js — axios instance for API calls
  - LoadingSpinner from Khushi
  - NoResults from Sahil
  - React Router — navigate to product detail page

  ENDPOINTS USED:
  - GET /products            — fetch all products
  - GET /products?search=    — live search
  - POST /cart               — add to cart from product card

  TO DO:
  - Replace dummy data with real API calls in Week 3
  - Connect search to GET /products?search= endpoint
*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import NoResults from '../components/NoResults'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('View All')
  const [searchOpen, setSearchOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cartMessage, setCartMessage] = useState('')
  const navigate = useNavigate()

  const categories = ['View All', '250g', '500g', '1kg']

  // debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const query = searchTerm ? `?search=${searchTerm}` : ''
        const res = await api.get(`/products${query}`)
        setProducts(res.data)
      } catch {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleAddToCart = async (productId) => {
    try {
      // TODO Week 3: await api.post('/cart', { productId, quantity: 1 })
      setCartMessage('Added to cart!')
      setTimeout(() => setCartMessage(''), 2000)
    } catch {
      setCartMessage('Could not add to cart.')
      setTimeout(() => setCartMessage(''), 2000)
    }
  }

  // filter by category/variant
  const displayed = activeCategory === 'View All'
    ? products
    : products.filter(p => p.variant === activeCategory)

  return (
    <div style={{
      background: '#FAFAF5',
      minHeight: '100vh',
      padding: '28px 32px'
    }}>

      {/* toast message */}
      {cartMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#C5EBDA',
          color: '#1A1A1A',
          padding: '12px 20px',
          borderRadius: '999px',
          fontSize: '15px',
          fontWeight: '700',
          zIndex: 1000,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          {cartMessage}
        </div>
      )}

      {/* search bar — appears when search icon clicked */}
      {searchOpen && (
        <div style={{ marginBottom: '20px', maxWidth: '600px' }}>
          <input
            type="text"
            placeholder="Search for a coffee..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '15px',
              color: '#1A1A1A',
              border: '1.5px solid #E8E8E4',
              borderRadius: '8px',
              background: '#FFFFFF',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          />
        </div>
      )}

      {/* category filter buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '16px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              border: '1.5px solid #1A1A1A',
              borderRadius: '999px',
              background: activeCategory === cat ? '#C5EBDA' : '#FFFFFF',
              color: '#1A1A1A',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* sort + filter row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px'
      }}>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '14px',
            fontWeight: '700',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'inherit'
          }}>
          SORT BY +
        </button>
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '14px',
          fontWeight: '700',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'inherit'
        }}>
          FILTER
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
        </button>
      </div>

      {/* loading */}
      {loading && <LoadingSpinner />}

      {/* no results */}
      {!loading && displayed.length === 0 && (
        <NoResults searchTerm={searchTerm} />
      )}

      {/* product grid */}
      {!loading && displayed.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {displayed.map(product => (
            <div
              key={product._id}
              style={{
                background: '#FFFFFF',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* product image */}
              <div
                onClick={() => navigate(`/products/${product._id}`)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  overflow: 'hidden',
                  background: '#F5F5CC'
                }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* card body */}
              <div
                onClick={() => navigate(`/products/${product._id}`)}
                style={{ padding: '12px 14px 14px' }}>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#1A1A1A',
                  margin: '0 0 2px',
                  textTransform: 'uppercase'
                }}>{product.name}</p>
                <p style={{
                  fontSize: '14px',
                  color: '#6B6B6B',
                  margin: 0
                }}>From $ {product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage