import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModal } from '../context/ModalContext.jsx'
import styles from './Navbar.module.css'
import logo from '../assets/bsclogo.png'


const NAV_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'About Event',  to: '/about' },
  { label: 'Speakers',     to: '/speakers' },
  { label: 'Timeline',     to: '/timeline' },
  { label: 'Instructions', to: '/instructions' },
  { label: 'Contact',      to: '/contact' },
]

export default function Navbar() {
  const { openRegister } = useModal()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [menuOpen])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>

          {/* Brand */}
          <Link to="/" className={styles.brand}>
            <img src={logo} alt="BashCraft" className={styles.brandIcon} />
            <span className={styles.brandName}>BashCraft</span>
          </Link>

          {/* Desktop nav links */}
          <nav className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                className={`${styles.navLink} ${location.pathname === link.to ? styles.active : ''}`}
                to={link.to}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className={styles.actions}>
            <Link className={styles.navButtonOutline} to="/login">Login</Link>
            <button className={styles.navButton} onClick={openRegister} type="button">Register</button>
          </div>

          {/* Mobile hamburger (three dots) */}
          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            type="button"
          >
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </button>

        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        ref={menuRef}
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerBrand}>
           <img src={logo} alt="BashCraft" className={styles.brandIcon} />
            <span className={styles.brandName}>BashCraft</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              className={`${styles.drawerLink} ${location.pathname === link.to ? styles.drawerLinkActive : ''}`}
              to={link.to}
              style={{ animationDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
            >
              <span className={styles.drawerLinkLabel}>{link.label}</span>
              <svg className={styles.drawerArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          ))}
        </nav>

        {/* Drawer actions */}
        <div className={styles.drawerActions}>
          <Link className={styles.drawerLogin} to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <button
            className={styles.drawerRegister}
            onClick={() => { openRegister(); setMenuOpen(false) }}
            type="button"
          >
            Register
          </button>
        </div>

        {/* Decorative glow */}
        <div className={styles.drawerGlow} aria-hidden="true" />
      </div>
    </>
  )
}
