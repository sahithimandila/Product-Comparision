import { useState, useEffect } from 'react'
import './App.css'
import products from './data/products'
import ProductCard from './components/ProductCard'
import ComparisonTable from './components/ComparisonTable'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [user, setUser] = useState(null)
  const [currentPage, setCurrentPage] = useState('login') // 'login', 'signup', 'app'
  const [selected, setSelected] = useState([])

  // Check if user is already logged in on mount
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
      setCurrentPage('app')
    }
  }, [])

  function handleLoginSuccess(userData) {
    setUser(userData)
    setCurrentPage('app')
  }

  function handleSignupSuccess(userData) {
    setUser(userData)
    setCurrentPage('app')
  }

  function handleLogout() {
    localStorage.removeItem('user')
    setUser(null)
    setSelected([])
    setCurrentPage('login')
  }

  function toggle(id) {
    setSelected((s) => {
      if (s.includes(id)) return s.filter((x) => x !== id)
      if (s.length >= 4) return s // limit to 4
      return [...s, id]
    })
  }

  const selectedProducts = selected.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  // Show login page
  if (currentPage === 'login') {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setCurrentPage('signup')}
      />
    )
  }

  // Show signup page
  if (currentPage === 'signup') {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    )
  }

  // Show comparison app
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-top">
          <h1>Product Comparison</h1>
          <div className="header-user">
            <span className="user-name">Welcome, {user?.name}!</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <p className="muted">Select up to 4 products to compare</p>
      </header>

      <main>
        <section className="product-list">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              selected={selected.includes(p.id)}
              onToggle={toggle}
            />
          ))}
        </section>

        <aside className="sidebar">
          <div className="selection">
            <h3>Selected ({selected.length})</h3>
            <ul>
              {selectedProducts.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
            <div className="actions">
              <button onClick={() => setSelected([])} disabled={selected.length === 0}>
                Clear
              </button>
            </div>
          </div>
        </aside>

        <section className="comparison-wrap">
          <ComparisonTable products={selectedProducts} />
        </section>
      </main>
    </div>
  )
}

export default App
