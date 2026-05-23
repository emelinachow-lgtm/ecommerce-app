/*
  ADMIN DASHBOARD — Emelina
  --------------------------
  Admin-only page showing all customer carts and product management.

  DEPENDENCIES:
  - authMiddleware + adminMiddleware from Sahil
  - Cart routes GET /api/admin/carts from cartRoutes.js
  - Product routes from productRoutes.js
  - AddEditProductModal from Sahil
  - DeleteProductModal from Sahil

  ENDPOINTS USED:
  - GET    /api/admin/carts       — fetch all users carts (admin only)
  - GET    /api/products          — fetch all products + stat count
  - GET    /api/users             — fetch all users for stat count
  - POST   /api/products          — add new product
  - PUT    /api/products/:id      — edit product
  - DELETE /api/products/:id      — delete product
*/

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import api from '../api'
import AddEditProductModal from '../components/AddEditProductModal'
import DeleteProductModal from '../components/DeleteProductModal'

function AdminPage() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [carts, setCarts] = useState([])
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState({
    totalCartValue: 0,
    activeCarts: 0,
    totalCustomers: 0,
    totalProducts: 0
  })
  const [loading, setLoading] = useState(true)
  const [addEditOpen, setAddEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [selectedCart, setSelectedCart] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [cartsRes, productsRes, usersRes] = await Promise.all([
          api.get('/cart/admin/carts'),
          api.get('/products'),
          api.get('/users')
        ])
        setProducts(productsRes.data)
        const cartsData = cartsRes.data
        setCarts(cartsData)
        const activeCarts = cartsData.filter(c => c.items.length > 0)
        const totalCartValue = activeCarts.reduce((sum, cart) => {
          return sum + cart.items.reduce((s, item) => {
            return s + (item.product?.price || 0) * item.quantity
          }, 0)
        }, 0)
        setStats({
          totalCartValue: totalCartValue.toFixed(2),
          activeCarts: activeCarts.length,
          totalCustomers: usersRes.data.length,
          totalProducts: productsRes.data.length
        })
      } catch (err) {
        console.error('Failed to fetch admin data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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

  const handleSaveProduct = async (productData) => {
    try {
      if (selectedProduct) {
        await api.put(`/products/${selectedProduct._id}`, productData)
        setToast('Product updated successfully')
      } else {
        await api.post('/products', productData)
        setToast('Product added successfully')
      }
      setAddEditOpen(false)
      const productsRes = await api.get('/products')
      setProducts(productsRes.data)
      setStats(prev => ({ ...prev, totalProducts: productsRes.data.length }))
      setTimeout(() => setToast(''), 3000)
    } catch (err) {
      console.error('Failed to save product:', err)
      setToast('Failed to save product')
      setTimeout(() => setToast(''), 3000)
    }
  }

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/products/${selectedProduct._id}`)
      setDeleteOpen(false)
      const productsRes = await api.get('/products')
      setProducts(productsRes.data)
      setStats(prev => ({ ...prev, totalProducts: productsRes.data.length }))
    } catch (err) {
      console.error('Failed to delete product:', err)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* sidebar */}
      <div style={{
        width: '220px', flexShrink: 0, background: '#C5EBDA',
        display: 'flex', flexDirection: 'column', padding: '24px 0'
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '0.5px solid rgba(0,0,0,0.1)', marginBottom: '16px' }}>
          <p style={{
            fontSize: '50px', fontWeight: '400', color: '#1A1A1A',
            margin: 0, lineHeight: 0.5, fontFamily: 'Jomhuria, serif', textTransform: 'uppercase'
          }}>espresso<br />yourself</p>
        </div>

        <p style={{
          fontSize: '13px', fontWeight: '700', color: 'rgba(0,0,0,0.5)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          padding: '0 20px', margin: '0 0 8px', textAlign: 'left'
        }}>Main</p>

        {[
          { id: 'dashboard', label: 'Dashboard', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          )},
          { id: 'products', label: 'Products', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
          )},
          { id: 'carts', label: 'All Carts', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
          )},
          { id: 'customers', label: 'Customers', icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/>
              <path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
          )}
        ].map(item => (
          <div
            key={item.id}
            onClick={() => (item.id === 'dashboard' || item.id === 'products') && setActiveNav(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 20px',
              background: activeNav === item.id ? 'rgba(0,0,0,0.1)' : 'transparent',
              fontWeight: activeNav === item.id ? '700' : '500',
              fontSize: '15px', color: '#1A1A1A',
              textTransform: 'uppercase', letterSpacing: '0.04em',
              opacity: item.id === 'dashboard' || item.id === 'products' ? 1 : 0.4,
              cursor: item.id === 'dashboard' || item.id === 'products' ? 'pointer' : 'not-allowed'
            }}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '0.5px solid rgba(0,0,0,0.1)' }}>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 2px', textAlign: 'left' }}>
            {user?.name || 'Admin User'}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)', margin: '0 0 12px', textAlign: 'left' }}>
            {user?.email || 'admin@espresso.com'}
          </p>
          <button
            onClick={() => navigate('/products')}
            style={{
              width: '100%', background: 'transparent', color: '#1A1A1A',
              border: '1.5px solid #1A1A1A', padding: '8px', borderRadius: '999px',
              fontSize: '12px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '0.04em', cursor: 'pointer', marginBottom: '8px', fontFamily: 'inherit'
            }}>← Back to Shop</button>
          <button
            onClick={() => { logout(); navigate('/login') }}
            style={{
              width: '100%', background: 'transparent', color: '#C0392B',
              border: '1.5px solid #C0392B', padding: '8px', borderRadius: '999px',
              fontSize: '12px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '0.04em', cursor: 'pointer', fontFamily: 'inherit'
            }}>Log Out</button>
        </div>
      </div>

      {/* main content */}
      <div style={{ flex: 1, background: '#FAFAF5', display: 'flex', flexDirection: 'column', textAlign: 'left' }}>

        {/* top bar */}
        <div style={{
          background: '#FFFFFF', padding: '20px 28px',
          borderBottom: '0.5px solid #E8E8E4',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <p style={{
              fontSize: '50px', fontWeight: '400', color: '#1A1A1A',
              textTransform: 'uppercase', letterSpacing: '0.02em',
              margin: '0 0 2px', fontFamily: 'Jomhuria, serif', lineHeight: 1
            }}>{activeNav === 'products' ? 'Products' : 'Dashboard'}</p>
            <p style={{ fontSize: '15px', color: '#6B6B6B', margin: 0 }}>Welcome back, Admin</p>
          </div>
          <button
            onClick={handleAddProduct}
            style={{
              background: '#C5EBDA', color: '#1A1A1A', border: 'none',
              padding: '14px 22px', borderRadius: '999px', fontSize: '15px',
              fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer'
            }}>+ Add Product</button>
        </div>

        {/* content area */}
        <div style={{ padding: '28px' }}>
          {loading ? (
            <p style={{ fontSize: '16px', color: '#6B6B6B' }}>Loading dashboard...</p>
          ) : (
            <>
              {/* stat cards — always visible */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
                {[
                  { label: 'Total cart value', value: `$${stats.totalCartValue}` },
                  { label: 'Total users', value: stats.totalCustomers },
                  { label: 'Active carts', value: stats.activeCarts },
                  { label: 'Products listed', value: stats.totalProducts }
                ].map((stat, i) => (
                  <div key={i} style={{ background: '#F5F5CC', borderRadius: '14px', padding: '20px 16px', textAlign: 'center' }}>
                    <p style={{
                      fontSize: '16px', fontWeight: '700', color: '#6B6B6B',
                      textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px'
                    }}>{stat.label}</p>
                    <p style={{
                      fontSize: '48px', fontWeight: '400', color: '#1A1A1A',
                      margin: 0, fontFamily: 'Jomhuria, serif', lineHeight: 1
                    }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* carts table — dashboard only */}
              {activeNav === 'dashboard' && (
                <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '0.5px solid #E8E8E4', overflow: 'hidden' }}>
                  <div style={{
                    padding: '16px 24px', borderBottom: '0.5px solid #E8E8E4',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <p style={{
                      fontSize: '16px', fontWeight: '700', color: '#1A1A1A',
                      textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0
                    }}>All customer carts</p>
                    <span style={{ fontSize: '14px', color: '#6B6B6B' }}>
                      {carts.filter(c => c.items.length > 0).length} active · {carts.length} total
                    </span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#F5F5F3' }}>
                        {['Customer', 'Items in cart', 'Cart total', 'Status', ''].map((h, i) => (
                          <th key={i} style={{
                            padding: '12px 18px', textAlign: 'left', fontSize: '14px',
                            fontWeight: '700', color: '#6B6B6B', textTransform: 'uppercase',
                            letterSpacing: '0.06em', borderBottom: '0.5px solid #E8E8E4'
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map(cart => {
                        const cartTotal = cart.items.reduce((sum, item) => {
                          return sum + (item.product?.price || 0) * item.quantity
                        }, 0)
                        const isActive = cart.items.length > 0
                        const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
                        return (
                          <tr key={cart._id} style={{ borderBottom: '0.5px solid #E8E8E4' }}>
                            <td style={{ padding: '16px 18px' }}>
                              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 2px' }}>
                                {cart.user?.name || 'Unknown'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0 }}>
                                {cart.user?.email || ''}
                              </p>
                            </td>
                            <td style={{ padding: '16px 18px' }}>
                              <span style={{ fontSize: '14px', color: isActive ? '#1A1A1A' : '#6B6B6B', fontStyle: isActive ? 'normal' : 'italic' }}>
                                {isActive ? `${totalItems} item${totalItems !== 1 ? 's' : ''}` : 'No items'}
                              </span>
                            </td>
                            <td style={{ padding: '16px 18px' }}>
                              <span style={{ fontSize: '16px', fontWeight: '700', color: cartTotal === 0 ? '#6B6B6B' : '#1A1A1A' }}>
                                ${cartTotal.toFixed(2)}
                              </span>
                            </td>
                            <td style={{ padding: '16px 18px' }}>
                              <span style={{
                                display: 'inline-block', fontSize: '14px', padding: '4px 12px',
                                borderRadius: '999px', fontWeight: '700', textTransform: 'uppercase',
                                letterSpacing: '0.04em', background: 'transparent',
                                color: isActive ? '#1A4D3A' : '#6B6B6B',
                                border: isActive ? '1.5px solid #C5EBDA' : '0.5px solid #E8E8E4'
                              }}>{isActive ? 'Active' : 'Empty'}</span>
                            </td>
                            <td style={{ padding: '16px 18px' }}>
                              <button
                                onClick={() => isActive && setSelectedCart(cart)}
                                style={{
                                  background: isActive ? '#C5EBDA' : 'transparent',
                                  color: '#1A1A1A',
                                  border: isActive ? 'none' : '0.5px solid #E8E8E4',
                                  padding: '8px 16px', borderRadius: '999px', fontSize: '13px',
                                  fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em',
                                  cursor: isActive ? 'pointer' : 'default'
                                }}>
                                {isActive ? 'View Order' : '—'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* products table — products nav only */}
              {activeNav === 'products' && (
                <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '0.5px solid #E8E8E4', overflow: 'hidden' }}>
                  <div style={{
                    padding: '16px 24px', borderBottom: '0.5px solid #E8E8E4',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    <p style={{
                      fontSize: '16px', fontWeight: '700', color: '#1A1A1A',
                      textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0
                    }}>All Products</p>
                    <span style={{ fontSize: '14px', color: '#6B6B6B' }}>{products.length} products</span>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#F5F5F3' }}>
                        {['Product', 'Roaster', 'Variant', 'Price', 'Stock', ''].map((h, i) => (
                          <th key={i} style={{
                            padding: '12px 18px', textAlign: 'left', fontSize: '14px',
                            fontWeight: '700', color: '#6B6B6B', textTransform: 'uppercase',
                            letterSpacing: '0.06em', borderBottom: '0.5px solid #E8E8E4'
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id} style={{ borderBottom: '0.5px solid #E8E8E4' }}>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                              />
                              <p style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A', margin: 0 }}>
                                {product.name}
                              </p>
                            </div>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ fontSize: '14px', color: '#6B6B6B' }}>{product.roaster}</span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ fontSize: '14px', color: '#6B6B6B' }}>{product.variant}</span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1A1A1A' }}>
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span style={{
                              fontSize: '14px', fontWeight: '700',
                              color: product.stock < 10 ? '#C0392B' : '#1A1A1A'
                            }}>{product.stock}</span>
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => handleEditProduct(product)}
                                style={{
                                  background: '#C5EBDA', color: '#1A1A1A', border: 'none',
                                  padding: '6px 14px', borderRadius: '999px', fontSize: '12px',
                                  fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer',
                                  fontFamily: 'inherit'
                                }}>Edit</button>
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                style={{
                                  background: 'transparent', color: '#C0392B',
                                  border: '1.5px solid #C0392B', padding: '6px 14px',
                                  borderRadius: '999px', fontSize: '12px', fontWeight: '700',
                                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit'
                                }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>

        {/* cart order modal */}
        {selectedCart && (
          <>
            <div
              onClick={() => setSelectedCart(null)}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.45)', zIndex: 200
              }}
            />
            <div style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF', borderRadius: '20px',
              padding: '32px', width: '520px', maxWidth: '90vw',
              maxHeight: '80vh', overflowY: 'auto',
              zIndex: 201, boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <p style={{
                    fontSize: '28px', fontWeight: '400', color: '#1A1A1A',
                    textTransform: 'uppercase', fontFamily: 'Jomhuria, serif',
                    margin: '0 0 4px', lineHeight: 1
                  }}>{selectedCart.user?.name}'s Order</p>
                  <p style={{ fontSize: '14px', color: '#6B6B6B', margin: 0 }}>
                    {selectedCart.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCart(null)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '24px', color: '#6B6B6B', padding: 0, lineHeight: 1
                  }}>×</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {selectedCart.items.map(item => (
                  <div key={item._id} style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    background: '#F5F5CC', borderRadius: '12px', padding: '14px'
                  }}>
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontSize: '30px', fontWeight: '400', color: '#1A1A1A',
                        textTransform: 'uppercase', fontFamily: 'Jomhuria, serif',
                        margin: '0 0 2px', lineHeight: 1, letterSpacing: '0.02em'
                      }}>{item.product?.name}</p>
                      <p style={{ fontSize: '13px', color: '#6B6B6B', margin: 0 }}>
                        {item.product?.variant} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0, flexShrink: 0 }}>
                      ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1.5px solid #E8E8E4', paddingTop: '16px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#1A1A1A' }}>Total</span>
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#1A1A1A' }}>
                  ${selectedCart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0).toFixed(2)} AUD
                </span>
              </div>
            </div>
          </>
        )}

      {/* modals */}
      <AddEditProductModal
        isOpen={addEditOpen}
        onClose={() => setAddEditOpen(false)}
        onSave={handleSaveProduct}
        existingProduct={selectedProduct}
      />
      <DeleteProductModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={selectedProduct?.name}
      />

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 300,
          pointerEvents: 'none'
        }}>
          <div style={{
            background: '#C5EBDA',
            color: '#1A1A1A',
            padding: '14px 24px',
            borderRadius: '999px',
            fontSize: '15px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            pointerEvents: 'auto'
          }}>
            {toast}
          </div>
        </div>
      )}

    </div>
  )
}

export default AdminPage