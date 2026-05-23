/*
  CART SIDEBAR — Emelina
  -----------------------
  Slide-out cart panel that appears over the page when
  the cart icon in the Navbar is clicked.

  PROPS:
  - isOpen (boolean) — shows or hides the sidebar
  - onClose (function) — called when X or overlay is clicked

  ENDPOINTS USED:
  - GET    /api/cart              — fetch cart when sidebar opens
  - PUT    /api/cart/:itemId      — update item quantity
  - DELETE /api/cart/:itemId      — remove item from cart
*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/useAuth'

function CartSidebar({ isOpen, onClose }) {
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { token } = useAuth()

  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity, 0
  )

  useEffect(() => {
    async function fetchCart() {
      if (!isOpen || !token) return
      try {
        setLoading(true)
        const res = await api.get('/cart')
        setCart(res.data)
      } catch (err) {
        console.error('Failed to fetch cart:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [isOpen, token])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  if (!token) return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.45)', zIndex: 100
      }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: '440px',
        background: '#FFFFFF', zIndex: 101, display: 'flex',
        flexDirection: 'column', boxShadow: '-4px 0 30px rgba(0,0,0,0.1)'
      }}>
        {/* header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '2px solid #1A1A1A' }}>
          <p style={{
            fontSize: '50px', fontWeight: '400', color: '#1A1A1A',
            textTransform: 'uppercase', letterSpacing: '0.02em',
            margin: 0, fontFamily: 'Jomhuria, serif', lineHeight: 1
          }}>Your Cart</p>
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '16px', textAlign: 'center', padding: '40px'
        }}>
          <div style={{ fontSize: '56px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
          </div>
          <p style={{
            fontSize: '40px', fontWeight: '400', color: '#1A1A1A',
            textTransform: 'uppercase',fontFamily: 'Jomhuria, serif', letterSpacing: '0.02em', margin: 0
          }}>Please log in to view your cart</p>
          <button
            onClick={() => { onClose(); navigate('/login') }}
            style={{
              background: '#C5EBDA', color: '#1A1A1A', border: 'none',
              padding: '14px 32px', borderRadius: '999px', fontSize: '16px',
              fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
              cursor: 'pointer', fontFamily: 'inherit'
            }}>Log In</button>
        </div>
      </div>
    </>
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
      console.error('Failed to update quantity:', err)
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
      console.error('Failed to remove item:', err)
    }
  }

  const handleViewCart = () => {
    onClose()
    navigate('/cart')
  }

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 100
        }}
      />

      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '440px',
        background: '#FFFFFF',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 30px rgba(0,0,0,0.1)'
      }}>

        {/* header */}
        <div style={{ padding: '28px 28px 20px', borderBottom: '2px solid #1A1A1A' }}>
          <p style={{
            fontSize: '50px', fontWeight: '400', color: '#1A1A1A',
            textTransform: 'uppercase', letterSpacing: '0.02em',
            margin: 0, fontFamily: 'Jomhuria, serif', lineHeight: 1
          }}>Your Cart</p>
        </div>

        {/* cart items or empty state */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#6B6B6B' }}>
              Loading...
            </div>
          ) : cart.items.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '56px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
              </div>
              <p style={{
                fontSize: '40px', fontWeight: '400', color: '#1A1A1A',
                textTransform: 'uppercase',fontFamily: 'Jomhuria, serif', letterSpacing: '0.02em', margin: 0
              }}>Your cart is currently empty</p>
              <button
                onClick={() => { onClose(); navigate('/products') }}
                style={{
                  background: '#C5EBDA', color: '#1A1A1A', border: 'none',
                  padding: '14px 32px', borderRadius: '999px', fontSize: '16px',
                  fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em',
                  cursor: 'pointer'
                }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.items.filter(item => item.product).map(item => (
                <div key={item._id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '14px',
                  background: '#F5F5CC', borderRadius: '14px', padding: '16px'
                }}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: '2px'
                    }}>
                      <p style={{
                        fontSize: '34px', fontWeight: '400', color: '#1A1A1A',
                        textTransform: 'uppercase', letterSpacing: '0.02em',
                        margin: 0, fontFamily: 'Jomhuria, serif', lineHeight: .75
                      }}>{item.product.name}</p>
                      <p style={{
                        fontSize: '18px', fontWeight: '700', color: '#1A1A1A',
                        margin: 0, flexShrink: 0, marginLeft: '8px'
                      }}>${item.product.price.toFixed(2)}</p>
                    </div>
                    <p style={{
                      fontSize: '16px', fontWeight: '700', color: '#1A1A1A',
                      textTransform: 'uppercase', margin: '0 0 2px', textAlign: 'left'
                    }}>{item.product.roaster}</p>
                    <p style={{
                      fontSize: '15px', color: '#6B6B6B',
                      margin: '0 0 12px', textAlign: 'left'
                    }}>{item.product.variant}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', background: '#C5EBDA',
                        borderRadius: '999px', padding: '6px 16px', gap: '16px'
                      }}>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '22px', color: '#1A1A1A', fontWeight: '700',
                            padding: 0, lineHeight: 1
                          }}>−</button>
                        <span style={{
                          fontSize: '18px', fontWeight: '700', color: '#1A1A1A',
                          minWidth: '20px', textAlign: 'center'
                        }}>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '22px', color: '#1A1A1A', fontWeight: '700',
                            padding: 0, lineHeight: 1
                          }}>+</button>
                      </div>
                      <button
                        onClick={() => handleRemove(item._id)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontSize: '15px', color: '#6B6B6B', textDecoration: 'underline', padding: 0
                        }}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        {cart.items.length > 0 && (
          <div style={{ padding: '20px 28px 28px', borderTop: '2px solid #1A1A1A' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '4px'
            }}>
              <span style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A1A' }}>Subtotal</span>
              <span style={{ fontSize: '22px', fontWeight: '900', color: '#1A1A1A' }}>
                ${subtotal.toFixed(2)} AUD
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#6B6B6B', margin: '0 0 16px' }}>
              Tax included. Shipping calculated at checkout.
            </p>
            <button
              onClick={() => { onClose(); navigate('/checkout') }}
              style={{
                background: '#C5EBDA', color: '#1A1A1A', border: 'none',
                padding: '18px 30px', borderRadius: '999px', fontSize: '18px',
                fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.06em',
                cursor: 'pointer', width: '100%', marginBottom: '12px',
                fontFamily: 'inherit'
              }}>Check Out</button>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleViewCart}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '16px', fontWeight: '700', color: '#1A1A1A',
                  textDecoration: 'underline', textTransform: 'uppercase',
                  letterSpacing: '0.04em', padding: 0
                }}>
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar