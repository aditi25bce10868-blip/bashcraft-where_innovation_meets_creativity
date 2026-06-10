import { useState } from 'react'
import { useModal } from '../../context/ModalContext.jsx'
import { registerUser } from '../../services/api.js'
import styles from './Modal.module.css'

export default function RegisterModal() {
  const { closeModal, openLogin } = useModal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await registerUser(formData)
      console.log('Registration successful:', result)
      setSuccess(true)
      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className={styles.modalBackdrop} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h2>Registration Successful!</h2>
            <p>Welcome to BashCraft Club. Check your email for confirmation.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeModal}>✕</button>

        <h2 className={styles.title}>Join BashCraft</h2>
        <p className={styles.subtitle}>Register for the most exciting tech event</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="college">College Name</label>
            <input
              id="college"
              name="college"
              type="text"
              placeholder="Your college"
              value={formData.college}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Registering...' : 'Register Now'}
          </button>
        </form>

        <p className={styles.footer}>
          Already registered? <button onClick={openLogin} style={{color: 'var(--primary)', cursor: 'pointer', background: 'none', border: 'none'}}>Login here</button>
        </p>
      </div>
    </div>
  )
}
