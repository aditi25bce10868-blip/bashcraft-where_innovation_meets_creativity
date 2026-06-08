import React, { useState, useEffect } from 'react'
import styles from './PosterModal.module.css'
import poster from '../../assets/poster.jpeg' 

export default function PosterModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so page loads first, then poster pops in
    const t = setTimeout(() => setVisible(true), 600)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div className={styles.overlay} onClick={() => setVisible(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={() => setVisible(false)}
          aria-label="Close poster"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Poster image */}
        <img
          src={poster}
          alt="BashNex'26 – The Spectrum of Tech"
          className={styles.poster}
        />

        {/* Optional CTA below poster */}
        <div className={styles.footer}>
          <span className={styles.dates}>📅 13th–14th June 2026</span>
          <button
            className={styles.registerBtn}
            onClick={() => {
              setVisible(false)
              window.open("https://docs.google.com/forms/d/e/1FAIpQLSd85y98TEpgxMvsAgo74sDCuXnaOPfb2nJCsnSBGsxu8-Ib3A/viewform?usp=header", '_blank')
            }}
            type="button"
          >
            Register Now
          </button>
        </div>

      </div>
    </div>
  )
}
