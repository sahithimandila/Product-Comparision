import React from 'react'

export default function ProductCard({ product, selected, onToggle }) {
  return (
    <div className={`pcard ${selected ? 'selected' : ''}`}>
      <img src={product.image} alt={product.name} />
      <div className="pcard-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.brand}</p>
        <p className="price">${product.price}</p>
        <p className="muted">Rating: {product.rating}</p>
        <div className="pcard-actions">
          <button onClick={() => onToggle(product.id)}>
            {selected ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  )
}
