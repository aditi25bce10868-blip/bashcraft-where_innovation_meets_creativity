import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext.jsx'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'About Event', to: '/about' },
  { label: 'Speakers',    to: '/speakers' },
  { label: 'Timeline',    to: '/timeline' },
  { label: 'Instructions',to: '/instructions' },
  { label: 'Contact',     to: '/contact' },
]

export default function Navbar() {
  const { openRegister } = useModal()

  return (
    <header className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.brandRow}>
          <span className={styles.brandIcon}>🔥</span>
          <span className={styles.brandName}>BashCraft</span>
        </div>

        <nav className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} className={styles.navLink} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link className={styles.navButtonOutline} to="/login">
            Login
          </Link>
          <button className={styles.navButton} onClick={openRegister} type="button">
            Register
          </button>
        </div>
      </div>
    </header>
  )
}

