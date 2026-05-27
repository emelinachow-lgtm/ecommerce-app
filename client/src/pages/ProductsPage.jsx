/*
  PRODUCTS PAGE — Shraddha
  -------------------------
  Displays all products in a grid with live search, category filters and sort.

  ENDPOINTS USED:
  - GET /api/products            — fetch all products
  - GET /api/products?search=    — live search by name, roaster or origin

  CONNECTED TO:
  - client/src/components/LoadingSpinner.jsx
  - client/src/components/NoResults.jsx
  - client/src/pages/ProductDetailPage.jsx — clicking a product navigates here
*/

import { useState, useEffect } from 'react'
import api from '../api'
import LoadingSpinner from '../components/LoadingSpinner'
import NoResults from '../components/NoResults'
import { useNavigate, useLocation } from 'react-router-dom'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('View All')
  const [sortBy, setSortBy] = useState('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // sync search term with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    if (search) {
      setSearchTerm(search)
    } else {
      setSearchTerm('')
    }
  }, [location.search])

  // debounced search
  useEffect(() => {
    // spinner only appears after 500ms so fast connections don't see a flicker
    const spinnerTimer = setTimeout(() => setShowSpinner(true), 500)
    // 300ms debounce — avoids an API call on every keystroke during live search
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        // search is server-side to filter the dataset; sort and filter run client-side on the result
        const query = searchTerm ? `?search=${searchTerm}` : ''
        const res = await api.get(`/products${query}`)
        setProducts(res.data)
      } catch {
        // keep existing products on error
      } finally {
        setLoading(false)
        setShowSpinner(false)
        clearTimeout(spinnerTimer)
      }
    }, 300)
    return () => {
      clearTimeout(timer)
      clearTimeout(spinnerTimer)
    }
  }, [searchTerm])

  // close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setSortOpen(false)
      setFilterOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // filter then sort
  const filtered = activeCategory === 'View All'
    ? products
    : products.filter(p => p.variant === activeCategory)

  const displayed = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
    return 0
  })

  const sortLabels = {
    'default': '',
    'price-asc': '$ ↑',
    'price-desc': '$ ↓',
    'name-asc': 'A–Z',
    'name-desc': 'Z–A'
  }

  return (
    <div style={{
      background: '#FAFAF5',
      minHeight: '100vh',
      padding: '28px 32px'
    }}>

      {/* filter + sort row */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
        position: 'relative'
      }}>

        {/* filter button */}
        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false) }}
            style={{
              fontSize: '14px', fontWeight: '700', color: '#1A1A1A',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '6px', fontFamily: 'inherit', padding: '10px 20px',
              borderRadius: '999px', border: '1.5px solid #1A1A1A',
              background: activeCategory !== 'View All' ? '#C5EBDA' : 'transparent'
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filter {activeCategory !== 'View All' ? `· ${activeCategory}` : ''}
          </button>

          {filterOpen && (
            <div style={{
              position: 'absolute', top: '48px', left: 0,
              background: '#FFFFFF', border: '1px solid #E8E8E4',
              borderRadius: '14px', padding: '8px', zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: '160px'
            }}>
              {['View All', '250g', '500g', '1kg'].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setFilterOpen(false) }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 16px', fontSize: '14px', fontWeight: '700',
                    color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em',
                    background: activeCategory === cat ? '#C5EBDA' : 'transparent',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* sort button */}
        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false) }}
            style={{
              fontSize: '14px', fontWeight: '700', color: '#1A1A1A',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '6px', fontFamily: 'inherit', padding: '10px 20px',
              borderRadius: '999px', border: '1.5px solid #1A1A1A',
              background: sortBy !== 'default' ? '#C5EBDA' : 'transparent'
            }}>
            Sort By {sortBy !== 'default' ? `· ${sortLabels[sortBy]}` : '+'}
          </button>

          {sortOpen && (
            <div style={{
              position: 'absolute', top: '48px', right: 0,
              background: '#FFFFFF', border: '1px solid #E8E8E4',
              borderRadius: '14px', padding: '8px', zIndex: 50,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: '220px'
            }}>
              {[
                { label: 'Default', value: 'default' },
                { label: 'Price: Low to High', value: 'price-asc' },
                { label: 'Price: High to Low', value: 'price-desc' },
                { label: 'Name: A to Z', value: 'name-asc' },
                { label: 'Name: Z to A', value: 'name-desc' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => { setSortBy(option.value); setSortOpen(false) }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '10px 16px', fontSize: '14px', fontWeight: '700',
                    color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em',
                    background: sortBy === option.value ? '#C5EBDA' : 'transparent',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* loading */}
      {loading && showSpinner && <LoadingSpinner />}

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
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* card body */}
              <div
                onClick={() => navigate(`/products/${product._id}`)}
                style={{ padding: '12px 14px 14px' }}>
                <p style={{
                  fontSize: '32px', fontWeight: '400', color: '#1A1A1A',
                  textTransform: 'uppercase', fontFamily: 'Jomhuria, serif',
                  margin: '0 0 4px', lineHeight: 1, letterSpacing: '0.02em'
                }}>{product.name}</p>
                <p style={{
                  fontSize: '14px', color: '#6B6B6B', margin: 0
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