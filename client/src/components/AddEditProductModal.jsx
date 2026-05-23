/*
  ADD/EDIT PRODUCT MODAL — Sahil
  --------------------------------
  Form modal for adding or editing a product.
  Admin only — triggered from AdminPage.jsx.

  PROPS:
  - isOpen (boolean) — shows or hides the modal
  - onClose (function) — called when Cancel is clicked
  - onSave (function) — called with product data object on Save
  - existingProduct (object|null) — null = add mode, object = edit mode

  USED BY:
  - client/src/pages/AdminPage.jsx — Emelina imports this

  NOTE:
  - This modal does NOT make API calls itself
  - It collects form data and passes it back via onSave()
  - AdminPage handles the actual POST or PUT API call
*/

import { useState, useEffect } from 'react'

function AddEditProductModal({ isOpen, onClose, onSave, existingProduct }) {
  const [name, setName] = useState('')
  const [roaster, setRoaster] = useState('')
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')
  const [variant, setVariant] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  // pre-fill fields if editing an existing product
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || '')
      setRoaster(existingProduct.roaster || '')
      setOrigin(existingProduct.origin || '')
      setPrice(existingProduct.price || '')
      setVariant(existingProduct.variant || '')
      setStock(existingProduct.stock || '')
      setImage(existingProduct.image || '')
      setDescription(existingProduct.description || '')
    } else {
      // reset all fields for add mode
      setName('')
      setRoaster('')
      setOrigin('')
      setPrice('')
      setVariant('')
      setStock('')
      setImage('')
      setDescription('')
    }
    setError('')
  }, [existingProduct, isOpen])

  const handleSave = () => {
    // validate all fields
    if (!name || !roaster || !origin || !price || !variant || !stock || !image || !description) {
      setError('Please fill in all fields')
      return
    }

    // pass data back to AdminPage to handle the API call
    onSave({
      name,
      roaster,
      origin,
      price: parseFloat(price),
      variant,
      stock: parseInt(stock),
      image,
      description
    })
  }

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
        maxWidth: '620px',
        zIndex: 201,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>

        {/* heading */}
        <p style={{
          fontSize: '50px',
          fontWeight: '400',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          margin: '0 0 28px',
          lineHeight: 1,
          fontFamily: 'Jomhuria, serif'
        }}>
          {existingProduct ? 'Edit Product' : 'Add New Product'}
        </p>

        {/* error */}
        {error && (
          <p style={{
            fontSize: '14px',
            color: '#C0392B',
            background: '#FDEDEC',
            padding: '10px 14px',
            borderRadius: '8px',
            margin: '0 0 16px'
          }}>{error}</p>
        )}

        {/* 2 column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px'
        }}>

          {/* product name */}
          <div>
            <label style={labelStyle}>Product Name</label>
            <input
              type="text"
              placeholder="Wild Child"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* roaster */}
          <div>
            <label style={labelStyle}>Roaster / Brand</label>
            <input
              type="text"
              placeholder="Cohort Coffee"
              value={roaster}
              onChange={e => setRoaster(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* origin */}
          <div>
            <label style={labelStyle}>Origin</label>
            <input
              type="text"
              placeholder="Ethiopia"
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* price */}
          <div>
            <label style={labelStyle}>Price (AUD)</label>
            <input
              type="number"
              placeholder="$29.00"
              value={price}
              onChange={e => setPrice(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* variant */}
          <div>
            <label style={labelStyle}>Variant</label>
            <input
              type="text"
              placeholder="1kg / Whole Bean"
              value={variant}
              onChange={e => setVariant(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* stock */}
          <div>
            <label style={labelStyle}>Stock</label>
            <input
              type="number"
              placeholder="50"
              value={stock}
              onChange={e => setStock(e.target.value)}
              style={inputStyle}
            />
          </div>

        </div>

        {/* image url — full width */}
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Image URL</label>
          <input
            type="text"
            placeholder="https://cohortcoffee.com.au/cdn/shop/products/"
            value={image}
            onChange={e => setImage(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* description — full width textarea */}
        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Description</label>
          <textarea
            placeholder="Bold, approachable blend with rich chocolate notes and smooth finish."
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              height: '100px',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

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
            onClick={handleSave}
            style={{
              flex: 1,
              background: '#C5EBDA',
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
            Save Product
          </button>
        </div>

      </div>
    </>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '700',
  color: '#1A1A1A',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: '6px'
}

const inputStyle = {
  width: '100%',
  background: '#F5F5F3',
  border: 'none',
  borderRadius: '10px',
  padding: '12px 14px',
  fontSize: '15px',
  color: '#1A1A1A',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  outline: 'none'
}

export default AddEditProductModal