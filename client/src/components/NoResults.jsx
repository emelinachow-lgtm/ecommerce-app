/*
  NO RESULTS COMPONENT — Sahil
  -----------------------------
  Shown on the Products page when a search returns no matches.

  PROPS:
  - searchTerm (string) — the term the user searched for

  USED BY:
  - client/src/pages/ProductsPage.jsx
*/

import { useNavigate } from 'react-router-dom'

function NoResults({ searchTerm }) {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
      textAlign: 'center'
    }}>

      {/* search minus icon */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: '28px' }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="8" y1="11" x2="14" y2="11" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      {/* heading */}
      <p style={{
        fontSize: '60px',
        fontWeight: '900',
        color: '#1A1A1A',
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
        margin: '0 0 20px',
        fontFamily: 'Jomhuria, serif',
        lineHeight: 1
      }}>No Results Found</p>

      {/* description */}
      <p style={{
        fontSize: '18px',
        color: '#1A1A1A',
        margin: '0 0 4px',
        lineHeight: 1.6
      }}>
        We couldn't find any matches for{' '}
        {searchTerm && (
          <strong>"{searchTerm}"</strong>
        )}.
      </p>
      <p style={{
        fontSize: '18px',
        color: '#1A1A1A',
        margin: '0 0 32px',
        lineHeight: 1.6
      }}>
        Try a different search or browse all products.
      </p>

      {/* view all products button */}
      <button
        onClick={() => navigate('/products', { replace: true })}
        style={{
          background: '#C5EBDA',
          color: '#1A1A1A',
          border: 'none',
          padding: '14px 40px',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          fontFamily: 'inherit'
        }}>
        View All Products
      </button>

    </div>
  )
}

export default NoResults