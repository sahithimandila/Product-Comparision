import React from 'react'

function renderValue(val) {
  if (Array.isArray(val)) return val.join(', ')
  return String(val)
}

export default function ComparisonTable({ products }) {
  if (!products || products.length === 0) return null

  const keys = new Set()
  products.forEach((p) => Object.keys(p).forEach((k) => keys.add(k)))
  // we don't want to show internal fields like id/image in the table header
  const hidden = new Set(['id', 'image'])
  const attrs = Array.from(keys).filter((k) => !hidden.has(k)).sort()

  return (
    <div className="comparison">
      <h2>Comparison</h2>
      <div className="comparison-table">
        <div className="row header">
          <div className="cell attr">Attribute</div>
          {products.map((p) => (
            <div key={p.id} className="cell product">
              <strong>{p.name}</strong>
              <div className="muted">{p.brand}</div>
            </div>
          ))}
        </div>

        {attrs.map((attr) => (
          <div key={attr} className="row">
            <div className="cell attr">{attr}</div>
            {products.map((p) => (
              <div key={p.id + attr} className="cell product">
                {renderValue(p[attr] ?? '—')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
