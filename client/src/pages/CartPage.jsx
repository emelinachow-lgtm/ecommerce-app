/*
  CART PAGE — Emelina
  --------------------
  Displays the logged in user's full cart.

  DEPENDENCIES:
  - authMiddleware from Sahil — JWT verified automatically via api.js
  - Cart routes from server/routes/cartRoutes.js
  - api.js handles JWT token automatically on every request

  ENDPOINTS USED:
  - GET    /api/cart              — fetch cart on page load
  - PUT    /api/cart/:itemId      — update item quantity
  - DELETE /api/cart/:itemId      — remove item from cart
*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function CartPage() {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notesOpen, setNotesOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()

  // fetch cart on page load
  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true)
        const res = await api.get('/cart')
        setCart(res.data)
      } catch (err) {
        setError('Failed to load cart. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0
  )

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return
    try {
      await api.put(`/cart/${itemId}`, { quantity: newQty })
      setCart(prev => ({
        ...prev,
        items: prev.items.map(item =>
          item._id === itemId ? { ...item, quantity: newQty } : item
        )
      }))
    } catch (err) {
      setError('Failed to update quantity.')
    }
  }

  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`)
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item._id !== itemId)
      }))
    } catch (err) {
      setError('Failed to remove item.')
    }
  }

  if (loading) return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontSize: '18px',
      color: '#6B6B6B'
    }}>Loading cart...</div>
  )

  if (error) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '16px'
    }}>
      <p style={{ fontSize: '18px', color: '#C0392B' }}>{error}</p>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: '#C5EBDA',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '999px',
          fontSize: '15px',
          fontWeight: '700',
          textTransform: 'uppercase',
          cursor: 'pointer'
        }}>Try Again</button>
    </div>
  )

  // empty state
  if (cart.items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '16px',
        textAlign: 'center',
        padding: '24px',
        background: '#FAFAF5'
      }}>
        <div style={{ fontSize: '56px' }}>🛒</div>
        <p style={{
          fontSize: '50px',
          fontWeight: '400',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: 0,
          fontFamily: 'Jomhuria, serif',
          lineHeight: 1
        }}>Your cart is empty :(</p>
        <button
          onClick={() => navigate('/products')}
          style={{
            background: '#C5EBDA',
            color: '#1A1A1A',
            border: 'none',
            padding: '14px 36px',
            borderRadius: '999px',
            fontSize: '16px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer'
          }}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '40px 28px',
      background: '#FAFAF5',
      minHeight: '100vh'
    }}>

      <h1 style={{
        fontSize: '50px',
        fontWeight: '400',
        color: '#1A1A1A',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        margin: '0 0 4px',
        fontFamily: 'Jomhuria, serif',
        lineHeight: 1
      }}>Your Cart</h1>

      {/* column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px 120px',
        padding: '12px 16px',
        marginBottom: '8px',
        borderBottom: '2px solid #1A1A1A'
      }}>
        <span style={headerStyle}>Product</span>
        <span style={{ ...headerStyle, textAlign: 'center' }}>Quantity</span>
        <span style={{ ...headerStyle, textAlign: 'right' }}>Total</span>
      </div>

      {/* cart items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        {cart.items.map(item => (
          <div key={item._id} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px 120px',
            alignItems: 'center',
            background: '#F5F5CC',
            borderRadius: '16px',
            padding: '18px'
          }}>

            {/* product info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                <p style={{
                  fontSize: '34px',
                  fontWeight: '400',
                  color: '#1A1A1A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  margin: 0,
                  fontFamily: 'Jomhuria, serif',
                  lineHeight: 0.75
                }}>{item.product.name}</p>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#1A1A1A',
                  textTransform: 'uppercase',
                  margin: 0
                }}>{item.product.roaster}</p>
                <p style={{
                  fontSize: '15px',
                  color: '#6B6B6B',
                  margin: 0
                }}>{item.product.variant}</p>
              </div>
            </div>

            {/* quantity controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#C5EBDA',
                borderRadius: '999px',
                padding: '6px 16px',
                gap: '16px'
              }}>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '22px',
                    color: '#1A1A1A',
                    fontWeight: '700',
                    padding: '0',
                    lineHeight: 1
                  }}>−</button>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1A1A1A',
                  minWidth: '20px',
                  textAlign: 'center'
                }}>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '22px',
                    color: '#1A1A1A',
                    fontWeight: '700',
                    padding: '0',
                    lineHeight: 1
                  }}>+</button>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#6B6B6B',
                  textDecoration: 'underline',
                  padding: 0
                }}>Remove</button>
            </div>

            {/* line total */}
            <p style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1A1A1A',
              textAlign: 'right',
              margin: 0
            }}>${(item.product.price * item.quantity).toFixed(2)}</p>

          </div>
        ))}
      </div>

      {/* divider */}
      <div style={{ height: '1px', background: '#E8E8E4', marginBottom: '24px' }} />

      {/* bottom row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <button
          onClick={() => navigate('/products')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700',
            color: '#1A1A1A',
            textDecoration: 'underline',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            padding: 0
          }}>
          Continue Shopping
        </button>

        <div style={{ textAlign: 'right', minWidth: '300px' }}>

          {/* item count + total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '18px', color: '#1A1A1A' }}>
              {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A1A' }}>
              ${total.toFixed(2)} AUD
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            style={{
              background: '#C5EBDA',
              color: '#1A1A1A',
              border: 'none',
              padding: '18px 32px',
              borderRadius: '999px',
              fontSize: '18px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              cursor: 'pointer',
              width: '100%'
            }}>Check Out</button>
        </div>
      </div>
    </div>
  )
}

const headerStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#1A1A1A',
  textTransform: 'uppercase',
  letterSpacing: '0.06em'
}

export default CartPage