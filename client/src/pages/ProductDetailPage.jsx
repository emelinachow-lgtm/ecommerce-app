/*
  PRODUCT DETAIL PAGE — Shraddha
  --------------------------------
  Shows full details of a single product.

  DEPENDENCIES:
  - api.js — axios instance for API calls
  - React Router — useParams to get product id, useNavigate to go back

  ENDPOINTS USED:
  - GET /products/:id — fetch single product on mount

  TO DO:
  - Replace dummy data with real API call in Week 3
  - Connect Add to Cart button to POST /cart
*/

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

// dummy product until API connected in Week 3
const dummyProduct = {
  _id: '1',
  name: 'Houseblend',
  roaster: 'Minimal Roasters · Mecca',
  origin: 'Brazil, Colombia',
  price: 20.00,
  variant: '1kg / Whole Beans',
  stock: 50,
  image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600',
  description: 'This is a coffee that is easy to love, full-bodied, rich and chocolaty, with a nutty sweetness. Black or with milk, it\'s deeply satisfying.',
  tastingNotes: 'Chocolate, Caramel, Nuts',
  coffeeProfile: 'Medium blend, Low acidity'
}

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(dummyProduct)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [cartMessage, setCartMessage] = useState('')

  // TODO Week 3: fetch real product
  // useEffect(() => {
  //   async function fetchProduct() {
  //     try {
  //       setLoading(true)
  //       const res = await api.get(`/products/${id}`)
  //       setProduct(res.data)
  //     } catch (err) {
  //       navigate('/404')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProduct()
  // }, [id])

  const handleQuantityChange = (change) => {
    const newQty = quantity + change
    if (newQty < 1 || newQty > product.stock) return
    setQuantity(newQty)
  }

  const handleAddToCart = async () => {
    try {
      // TODO Week 3: await api.post('/cart', { productId: product._id, quantity })
      setCartMessage('Added to cart!')
      setTimeout(() => setCartMessage(''), 2000)
    } catch {
      setCartMessage('Could not add to cart.')
      setTimeout(() => setCartMessage(''), 2000)
    }
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px', fontSize: '18px' }}>
      Loading...
    </div>
  )

  return (
    <div style={{
      background: '#FAFAF5',
      minHeight: '100vh',
      padding: '60px 48px'
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

      {/* two column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'center'
      }}>

        {/* left — product image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* right — product details */}
        <div style={{ textAlign: 'center' }}>

          {/* product name */}
          <p style={{
            fontSize: '52px',
            fontWeight: '400',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            margin: '0 0 8px',
            fontFamily: 'Jomhuria, serif',
            lineHeight: 1
          }}>{product.name}</p>

          {/* roaster */}
          <p style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            margin: '0 0 20px'
          }}>{product.roaster}</p>

          {/* description */}
          <p style={{
            fontSize: '16px',
            color: '#1A1A1A',
            lineHeight: 1.6,
            margin: '0 0 36px',
            maxWidth: '440px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>{product.description}</p>

          {/* info icons row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            marginBottom: '36px',
            paddingBottom: '36px',
            borderBottom: '0.5px solid #E8E8E4'
          }}>

            {/* origin */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6B6B6B', margin: '0 0 4px' }}>Origin</p>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>{product.origin}</p>
            </div>

            {/* tasting notes */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6B6B6B', margin: '0 0 4px' }}>Tasting Notes</p>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>{product.tastingNotes || 'N/A'}</p>
            </div>

            {/* coffee profile */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-30 12 12)"/>
                  <ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(30 12 12)"/>
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6B6B6B', margin: '0 0 4px' }}>Coffee Profile</p>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>{product.coffeeProfile || 'N/A'}</p>
            </div>

          </div>

          {/* price + quantity row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px'
          }}>

            {/* price */}
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontSize: '32px',
                fontWeight: '900',
                color: '#1A1A1A',
                margin: '0 0 4px'
              }}>${product.price.toFixed(2)}</p>
              <p style={{
                fontSize: '14px',
                color: '#6B6B6B',
                margin: 0
              }}>${product.price.toFixed(2)} / kg</p>
            </div>

            {/* quantity controls */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '6px'
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}>−</button>
                <span style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1A1A1A',
                  minWidth: '24px',
                  textAlign: 'center'
                }}>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    cursor: 'pointer',
                    padding: 0,
                    lineHeight: 1
                  }}>+</button>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#6B6B6B',
                margin: 0
              }}>{product.variant}</p>
            </div>

          </div>

          {/* add to cart button */}
          <button
            onClick={handleAddToCart}
            style={{
              width: '100%',
              background: '#C5EBDA',
              color: '#1A1A1A',
              border: 'none',
              padding: '18px',
              borderRadius: '999px',
              fontSize: '18px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              marginBottom: '16px',
              fontFamily: 'inherit'
            }}>
            Add to Cart
          </button>

          {/* back link */}
          <button
            onClick={() => navigate('/products')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              color: '#6B6B6B',
              textDecoration: 'underline',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            ← Back to Shop
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage