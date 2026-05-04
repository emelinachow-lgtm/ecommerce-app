/*
  ADMIN DASHBOARD — Emelina
  --------------------------
  Admin-only page showing all customer carts and product management.

  DEPENDENCIES:
  - Requires authMiddleware + adminMiddleware from Sahil
  - Requires Cart routes GET /api/admin/carts from cartRoutes.js
  - Requires Product routes from productRoutes.js
  - Requires AddEditProductModal from Sahil (client/src/components/AddEditProductModal.jsx)
  - Requires DeleteProductModal from Sahil (client/src/components/DeleteProductModal.jsx)
  - Requires LoadingSpinner from Khushi (client/src/components/LoadingSpinner.jsx)

  ENDPOINTS USED:
  - GET    /api/admin/carts       — fetch all users carts (admin only)
  - GET    /api/products          — fetch all products for stat card count
  - POST   /api/products          — add new product (via AddEditProductModal)
  - PUT    /api/products/:id      — edit product (via AddEditProductModal)
  - DELETE /api/products/:id      — delete product (via DeleteProductModal)

  TO DO:
  - Replace dummy data with real API calls in Week 3
  - Import and connect AddEditProductModal once Sahil pushes it
  - Import and connect DeleteProductModal once Sahil pushes it
*/

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// temporary dummy data until API is connected in Week 3
const dummyStats = {
  totalCartValue: 892,
  activeCarts: 4,
  totalCustomers: 24,
  totalProducts: 15
}

const dummyCarts = [
  {
    _id: '1',
    user: { name: 'Jamie Lee', email: 'jamie@gmail.com' },
    items: [
      { _id: 'i1', product: { name: 'Wild Child', variant: '1kg' }, quantity: 2 },
      { _id: 'i2', product: { name: 'House Blend', variant: '500g' }, quantity: 1 }
    ],
    total: 77.00,
    status: 'active'
  },
  {
    _id: '2',
    user: { name: 'Sam Rivera', email: 'sam@gmail.com' },
    items: [
      { _id: 'i3', product: { name: 'Head Honcho', variant: '250g' }, quantity: 1 }
    ],
    total: 19.50,
    status: 'active'
  },
  {
    _id: '3',
    user: { name: 'Morgan Kim', email: 'morgan@gmail.com' },
    items: [
      { _id: 'i4', product: { name: 'Smooth Talker', variant: '1kg' }, quantity: 1 },
      { _id: 'i5', product: { name: 'Happy Chappy', variant: '500g' }, quantity: 3 }
    ],
    total: 119.00,
    status: 'active'
  },
  {
    _id: '4',
    user: { name: 'Alex Chen', email: 'alex@gmail.com' },
    items: [
      { _id: 'i6', product: { name: 'Groover Blend', variant: '1kg' }, quantity: 2 },
      { _id: 'i7', product: { name: 'Breezy Blend', variant: '250g' }, quantity: 1 }
    ],
    total: 96.50,
    status: 'active'
  },
  {
    _id: '5',
    user: { name: 'Taylor Park', email: 'taylor@gmail.com' },
    items: [],
    total: 0,
    status: 'empty'
  }
]

function AdminPage() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [addEditOpen, setAddEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setAddEditOpen(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setAddEditOpen(true)
  }

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setDeleteOpen(true)
  }

  const handleSaveProduct = (productData) => {
    // TODO Week 3: call POST or PUT /api/products
    console.log('save product', productData)
    setAddEditOpen(false)
  }

  const handleConfirmDelete = () => {
    // TODO Week 3: call DELETE /api/products/:id
    console.log('delete product', selectedProduct)
    setDeleteOpen(false)
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>

      {/* sidebar */}
      <div style={{
        width: '200px',
        flexShrink: 0,
        background: '#C5EBDA',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0'
      }}>
        {/* logo */}
        <div style={{
          padding: '0 20px 24px',
          borderBottom: '0.5px solid rgba(0,0,0,0.1)',
          marginBottom: '16px'
        }}>
          <p style={{
            fontSize: '50px',
            fontWeight: '400',
            color: '#1A1A1A',
            margin: 0,
            lineHeight: .5,
            fontFamily: 'Jomhuria, serif'
          }}>espresso<br />yourself</p>
        </div>

        {/* section label */}
        <p style={{
          fontSize: '12px',
          fontWeight: '700',
          color: 'rgba(0,0,0,0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 20px',
          margin: '0 0 8px',
          textAlign: 'left'
        }}>Main</p>

        {/* nav items */}
        {[
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            )
          },
          {
            id: 'products',
            label: 'Products',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
            )
          },
          {
            id: 'carts',
            label: 'All Carts',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            )
          },
          {
            id: 'customers',
            label: 'Customers',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                <path d="M16 3.13a4 4 0 010 7.75"/>
              </svg>
            )
          }
        ].map(item => (
          <div
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              cursor: 'pointer',
              background: activeNav === item.id ? 'rgba(0,0,0,0.1)' : 'transparent',
              fontWeight: activeNav === item.id ? '700' : '500',
              fontSize: '11px',
              color: '#1A1A1A',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}

        {/* admin user at bottom */}
        <div style={{
          marginTop: 'auto',
          padding: '16px 20px',
          borderTop: '0.5px solid rgba(0,0,0,0.1)'
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#1A1A1A',
            margin: '0 0 2px',
            textAlign: 'left'
          }}>Admin User</p>
          <p style={{
            fontSize: '10px',
            color: 'rgba(0,0,0,0.5)',
            margin: 0,
            textAlign: 'left'
          }}>admin@espresso.com</p>
        </div>
      </div>

      {/* main content */}
      <div style={{
        flex: 1,
        background: '#FAFAF5',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
      }}>

        {/* top bar */}
        <div style={{
          background: '#FFFFFF',
          padding: '16px 24px',
          borderBottom: '0.5px solid #E8E8E4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <p style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#1A1A1A',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              margin: '0 0 2px'
            }}>Dashboard</p>
            <p style={{
              fontSize: '12px',
              color: '#6B6B6B',
              margin: 0
            }}>Welcome back, Admin</p>
          </div>
          <button
            onClick={handleAddProduct}
            style={{
              background: '#C5EBDA',
              color: '#1A1A1A',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}>+ Add Product</button>
        </div>

        {/* content area */}
        <div style={{ padding: '24px' }}>

          {/* stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {[
              { label: 'Total cart value', value: `$${dummyStats.totalCartValue}`, highlight: true },
              { label: 'Total users', value: dummyStats.totalCustomers },
              { label: 'Active carts', value: dummyStats.activeCarts },
              { label: 'Products listed', value: dummyStats.totalProducts }
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#F5F5CC',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 6px'
                }}>{stat.label}</p>
                <p style={{
                  fontSize: '45px',
                  fontWeight: '900',
                  color: '#1A1A1A',
                  margin: 0,
                  fontFamily: 'Jomhuria, serif',
                }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* carts table */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '0.5px solid #E8E8E4',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '14px 20px',
              borderBottom: '0.5px solid #E8E8E4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <p style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#1A1A1A',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                margin: 0
              }}>All customer carts</p>
              <span style={{
                fontSize: '10px',
                color: '#6B6B6B'
              }}>{dummyCarts.filter(c => c.status === 'active').length} active · {dummyCarts.length} total</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#F5F5F3' }}>
                  {['Customer', 'Items in cart', 'Qty', 'Cart total', 'Status', ''].map((h, i) => (
                    <th key={i} style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#6B6B6B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      borderBottom: '0.5px solid #E8E8E4'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dummyCarts.map(cart => (
                  <tr key={cart._id} style={{ borderBottom: '0.5px solid #E8E8E4' }}>

                    {/* customer */}
                    <td style={{ padding: '14px 16px' }}>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '700',
                        color: '#1A1A1A',
                        margin: '0 0 2px'
                      }}>{cart.user.name}</p>
                      <p style={{
                        fontSize: '10px',
                        color: '#6B6B6B',
                        margin: 0
                      }}>{cart.user.email}</p>
                    </td>

                    {/* items */}
                    <td style={{ padding: '14px 16px' }}>
                      {cart.items.length === 0 ? (
                        <span style={{ fontSize: '11px', color: '#6B6B6B', fontStyle: 'italic' }}>No items</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {cart.items.map(item => (
                            <span key={item._id} style={{ fontSize: '11px', color: '#1A1A1A' }}>
                              {item.product.name} — {item.product.variant}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* qty */}
                    <td style={{ padding: '14px 16px' }}>
                      {cart.items.length === 0 ? (
                        <span style={{ color: '#6B6B6B' }}>—</span>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {cart.items.map(item => (
                            <span key={item._id} style={{ fontSize: '11px', color: '#6B6B6B' }}>× {item.quantity}</span>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* total */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: '700',
                        color: cart.total === 0 ? '#6B6B6B' : '#1A1A1A'
                      }}>${cart.total.toFixed(2)}</span>
                    </td>

                    {/* status badge */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        background: 'transparent',
                        color: cart.status === 'active' ? '#1A4D3A' : '#6B6B6B',
                        border: cart.status === 'active' ? '1.5px solid #C5EBDA' : '0.5px solid #E8E8E4'
                      }}>{cart.status}</span>
                    </td>

                    {/* view order button */}
                    <td style={{ padding: '14px 16px' }}>
                      <button style={{
                        background: cart.status === 'active' ? '#C5EBDA' : 'transparent',
                        color: '#1A1A1A',
                        border: cart.status === 'active' ? 'none' : '0.5px solid #E8E8E4',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '10px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        cursor: cart.status === 'active' ? 'pointer' : 'default'
                      }}>
                        {cart.status === 'active' ? 'View Order' : '—'}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* TODO Week 3: Add AddEditProductModal and DeleteProductModal here once Sahil pushes them */}

    </div>
  )
}

export default AdminPage