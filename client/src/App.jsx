import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App