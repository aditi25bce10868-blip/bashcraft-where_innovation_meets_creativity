import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoRow}>
            <span className={styles.logoIcon}>🔥</span>
            <span className={styles.brand}>BashCraft Club</span>
          </div>

          <p className={styles.tagline}>
            Building Communities. Creating
            Experiences. Inspiring Growth..
          </p>

          <div className={styles.social}>
            <a href="https://www.instagram.com/bashcraft.vit?igsh=OWpibHJ4bWYyazU2" aria-label="instagram" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <span className={styles.emoji}>📸</span>
            </a>
            <a href="https://www.linkedin.com/company/bashcraft/" aria-label="linkedin" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <span className={styles.emoji}>💼</span>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <h4 className={styles.linksTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/speakers">Speakers</Link></li>
            <li><Link to="/instructions">Timeline</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
