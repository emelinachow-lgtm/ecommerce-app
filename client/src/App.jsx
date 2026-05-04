import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import CartSidebar from './components/CartSidebar'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <BrowserRouter>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path='/admin/*' element={null} />
        <Route path='*' element={<Navbar />} />
      </Routes>

      {/* temporary test button — remove once Shraddha connects cart icon in Navbar */}
      {!cartOpen && (
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 200,
              background: '#C5EBDA',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '999px',
              fontWeight: '700',
              cursor: 'pointer'
          }}>
          Open Cart
        </button>
      )}

      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute adminOnly={true}>
            <AdminPage />
          </ProtectedRoute>
        } /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App