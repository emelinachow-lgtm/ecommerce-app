/*
  DELETE PRODUCT MODAL — Sahil
  -----------------------------
  Confirmation popup when admin deletes a product.

  PROPS:
  - isOpen (boolean) — shows or hides the modal
  - onClose (function) — called when Cancel is clicked
  - onConfirm (function) — called when Delete Product is clicked
  - productName (string) — shown in the description text

  USED BY:
  - client/src/pages/AdminPage.jsx — Emelina imports this
*/

function DeleteProductModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null

  return (
    <>
      {/* dark overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 200
        }}
      />

      {/* modal card */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '40px 44px',
        width: '100%',
        maxWidth: '520px',
        zIndex: 201,
        textAlign: 'center'
      }}>

        {/* warning icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#FDEDEC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C0392B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>

        {/* heading */}
        <p style={{
          fontSize: '50px',
          fontWeight: '400',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: '0 0 16px',
          lineHeight: 1,
          fontFamily: 'Jomhuria, serif'
        }}>
          Delete Product <br /> Are you sure?
        </p>

        {/* description */}
        <p style={{
          fontSize: '16px',
          color: '#1A1A1A',
          margin: '0 0 32px',
          lineHeight: 1.6
        }}>
          This will permanently remove{' '}
          <strong>{productName}</strong>{' '}
          from the store. This action cannot be undone. All associated data will be lost.
        </p>

        {/* buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#F5F5F3',
              color: '#1A1A1A',
              border: 'none',
              padding: '14px',
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              background: '#C0392B',
              color: '#FFFFFF',
              border: 'none',
              padding: '14px',
              borderRadius: '999px',
              fontSize: '15px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}>
            Delete Product
          </button>
        </div>

      </div>
    </>
  )
}

export default DeleteProductModal