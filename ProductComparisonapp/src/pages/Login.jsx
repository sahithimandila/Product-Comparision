import React, { useState } from 'react'

export default function Login({ onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    // Basic validation passed - simulate login
    // In a real app, this would call a backend API
    const user = { email, name: email.split('@')[0] }
    localStorage.setItem('user', JSON.stringify(user))
    onLoginSuccess(user)
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Product Comparison</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <button type="submit" className="auth-btn">
            Sign In
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="link-btn"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
