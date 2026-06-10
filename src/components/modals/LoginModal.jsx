import { useState } from 'react'
import { useModal } from '../../context/ModalContext.jsx'
import { loginUser } from '../../services/api.js'
import styles from './Modal.module.css'

export default function LoginModal() {
  const { closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser(email)
      console.log('Login successful:', result)
      closeModal()
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal}>✕</button>

        <h2 className={styles.title}>Login to BashCraft</h2>
        <p className={styles.subtitle}>Enter your email to access your account</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account? <button onClick={closeModal} style={{color: 'var(--primary)'}}>Register here</button>
        </p>
      </div>
    </div>
  )
}
