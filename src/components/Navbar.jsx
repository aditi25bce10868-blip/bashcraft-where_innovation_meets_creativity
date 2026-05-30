import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo */}
      <a href="#hero" className={styles.logo}>
        <span className={styles.logoEmoji}>🔥</span>
        <span className={styles.logoText}>
          Bash<span className={styles.logoAccent}>Craft</span>
        </span>
      </a>

      {/* Desktop Links */}
      <ul className={styles.links}>
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href} className={styles.link}>{link.label}</a>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button className={styles.cta} onClick={() => {/* open register modal */}}>
        Register Now
      </button>

      {/* Mobile Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? styles.barOpen : ''} />
        <span className={menuOpen ? styles.barOpen : ''} />
        <span className={menuOpen ? styles.barOpen : ''} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button className={styles.ctaMobile}>Register Now</button>
        </div>
      )}
    </nav>
  )
}
