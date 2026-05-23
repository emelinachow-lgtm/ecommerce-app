/*
  CHECKOUT PAGE — Emelina
  ------------------------
  Simple order confirmation page shown after checkout.
*/

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/useAuth'

function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await api.get('/cart')
        setCart(res.data)
      } catch (err) {
        console.error('Failed to fetch cart:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [])

  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity, 0
  )

  const orderNumber = `EY-${Math.floor(1000 + Math.random() * 9000)}`

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF5' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 28px' }}>

        {/* success header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: '#C5EBDA', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1A4D3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <p style={{
            fontSize: '64px', fontWeight: '400', color: '#1A1A1A',
            textTransform: 'uppercase', fontFamily: 'Jomhuria, serif',
            margin: '0 0 8px', lineHeight: 1
          }}>Order Placed!</p>
          <p style={{ fontSize: '16px', color: '#6B6B6B', margin: 0 }}>
            Thank you {user?.name?.split(' ')[0] || 'for your order'}. Your coffee is on its way.
          </p>
        </div>

        {/* order number */}
        <div style={{
          background: '#F5F5CC', borderRadius: '14px',
          padding: '20px 24px', marginBottom: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Order Number
          </span>
          <span style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A1A' }}>
            {orderNumber}
          </span>
        </div>

        {/* order items */}
        {!loading && cart.items.length > 0 && (
          <div style={{
            background: '#FFFFFF', borderRadius: '20px',
            border: '0.5px solid #E8E8E4', overflow: 'hidden', marginBottom: '24px'
          }}>
            <div style={{ padding: '16px 24px', borderBottom: '0.5px solid #E8E8E4' }}>
              <p style={{
                fontSize: '14px', fontWeight: '700', color: '#1A1A1A',
                textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0
              }}>Order Summary</p>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cart.items.map(item => (
                <div key={item._id} style={{
                  display: 'flex', alignItems: 'center', gap: '14px'
                }}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '32px', fontWeight: '400', color: '#1A1A1A',
                      textTransform: 'uppercase', fontFamily: 'Jomhuria, serif',
                      margin: '0 0 4px', lineHeight: 1, letterSpacing: '0.02em'
                    }}>{item.product?.name}</p>
                    <p style={{ fontSize: '15px', color: '#6B6B6B', margin: 0 }}>
                      {item.product?.variant} · Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div style={{
              padding: '16px 24px', borderTop: '0.5px solid #E8E8E4',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A1A' }}>
                ${subtotal.toFixed(2)} AUD
              </span>
            </div>
          </div>
        )}

        {/* delivery info */}
        <div style={{
          background: '#FFFFFF', borderRadius: '20px',
          border: '0.5px solid #E8E8E4', padding: '20px 24px', marginBottom: '32px'
        }}>
          <p style={{
            fontSize: '14px', fontWeight: '700', color: '#1A1A1A',
            textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px'
          }}>Delivery Information</p>
          <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0, lineHeight: 1.6 }}>
            Your order will be dispatched within 1-2 business days.
            You will receive a confirmation email shortly.
          </p>
        </div>

        {/* buttons */}
        <button
          onClick={() => navigate('/products')}
          style={{
            width: '100%', background: '#C5EBDA', color: '#1A1A1A',
            border: 'none', padding: '16px', borderRadius: '999px',
            fontSize: '16px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '0.05em', cursor: 'pointer', marginBottom: '12px',
            fontFamily: 'inherit'
          }}>
          Continue Shopping
        </button>
        <button
          onClick={() => navigate('/profile')}
          style={{
            width: '100%', background: 'transparent', color: '#1A1A1A',
            border: '1.5px solid #1A1A1A', padding: '14px', borderRadius: '999px',
            fontSize: '15px', fontWeight: '700', textTransform: 'uppercase',
            letterSpacing: '0.05em', cursor: 'pointer', fontFamily: 'inherit'
          }}>
          View Profile
        </button>

      </div>
    </div>
  )
}

export default CheckoutPage