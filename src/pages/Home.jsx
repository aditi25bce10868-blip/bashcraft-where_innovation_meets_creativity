import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { SPEAKERS, COMPANY_COLORS } from '../constants/speakers';
import InterviewBuddy from '../assets/interviewBuddy.jpeg';
import styles from './Home.module.css';

const Home = () => {
  const { openRegister, openLogin } = useModal();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  const eventDate = new Date(2026, 5, 13, 10, 0, 0).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const fadeUp = {
    hidden:   { opacity: 0, y: 30 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className={styles.homeContainer}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* ── HERO GRID ── */}
      <div className={styles.heroGrid}>

        {/* Left Column */}
        <motion.div className={styles.heroContent} variants={fadeUp}>
          <span className={styles.liveBadge}>🎙️ Live Online Event</span>
          <h1 className={styles.mainTitle}>
            Learn From <span className={styles.gradientText}>FAANG & Big 4</span> Professionals
          </h1>
          <p className={styles.description}>
            Join BashCraft Club's exclusive online mentorship session and get guidance from
            industry experts working at top tech companies worldwide.
          </p>

          <p className={styles.timerIntro}>Where Innovation Meets Creativity</p>

          {/* Timer */}
          <div className={styles.timerCardCompact}>
            <div className={styles.timerHeader}>
              <span className={styles.timerIcon}>⏳</span>
              <h3>Event Starts In</h3>
            </div>
            <div className={styles.countdown}>
              {[
                { val: timeLeft.days,    label: 'Days' },
                { val: timeLeft.hours,   label: 'Hours' },
                { val: timeLeft.minutes, label: 'Mins' },
                { val: timeLeft.seconds, label: 'Secs' },
              ].map(({ val, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span className={styles.timeSeparator}>:</span>}
                  <div className={styles.timeBlock}>
                    <span className={styles.timeNumber}>{String(val).padStart(2, '0')}</span>
                    <span className={styles.timeLabel}>{label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <p className={styles.timerFootnote}>✨ Don't miss this opportunity! ✨</p>
          </div>

          <div className={styles.careersWrapper}>
            <div className={styles.careersSection}>
              <div className={styles.iconWrapper}>💼</div>
              <div>
                <h3>Career beyond the classroom</h3>
                <p>Learn from industry experts and gain real-world insights.</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <motion.button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSd85y98TEpgxMvsAgo74sDCuXnaOPfb2nJCsnSBGsxu8-Ib3A/viewform?usp=header", "_blank")}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
            <motion.button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={openLogin}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <Link to="/speakers">
              <motion.button
                className={`${styles.btn} ${styles.btnOutline}`}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                Explore Speakers
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}><h3>15+</h3><p>Expert Speakers</p></div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}><h3>500+</h3><p>Registered Students</p></div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}><h3>10+</h3><p>Companies</p></div>
          </div>
        </motion.div>

        {/* Right Column — Featured Speakers only, no sponsor */}
        <motion.div className={styles.heroVisual} variants={fadeUp}>
          <div className={styles.speakerGrid}>
            <h3 className={styles.speakerTitle}>✨ Featured Speakers ✨</h3>
            <div className={styles.speakerCards}>
              {SPEAKERS.map((speaker) => {
                const companyColor = COMPANY_COLORS[speaker.company] || speaker.color || '#888';
                return (
                  <div key={speaker.id} className={styles.speakerCard}>
                    <div className={styles.speakerImageWrapper}>
                      <img
                        src={speaker.img}
                        alt={speaker.name}
                        className={styles.speakerImage}
                        loading="lazy"
                      />
                    </div>
                    <h4>{speaker.name}</h4>
                    <p>{speaker.role}</p>
                    <span
                      className={styles.companyBadge}
                      style={{
                        backgroundColor: companyColor,
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                      }}
                    >
                      {speaker.companyLogo && (
                        <img
                          src={speaker.companyLogo}
                          alt={speaker.company}
                          style={{ width: '14px', height: '14px', objectFit: 'contain', borderRadius: '2px' }}
                        />
                      )}
                      {speaker.company}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── SPONSOR STRIP ── */}
      <motion.div
        variants={fadeUp}
        style={{
          width: '100%',
          padding: '56px 48px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(135deg, rgba(232,67,10,0.04) 0%, transparent 50%, rgba(232,67,10,0.04) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >

        <div style={{ position: 'absolute', left: '20%', top: '50%', transform: 'translateY(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(232,67,10,0.08), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '20%', top: '50%', transform: 'translateY(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(120,80,255,0.06), transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        {/* Label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1 }}>
          <div className={styles.sponsorLines} style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
          <p style={{ fontFamily: 'var(--font-accent)', fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: 0, textAlign: 'center' }}>
            🏆 &nbsp; Proudly Sponsored By
          </p>
          <div className={styles.sponsorLines} style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)' }} />
        </div>

        {/* Logo card */}
        <div className={styles.sponsorLogo}>
          <img src={InterviewBuddy} alt="Interview Buddy — Official Sponsor" />
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, fontFamily: 'var(--font-body)', letterSpacing: '0.02em', zIndex: 1, textAlign: 'center' }}>
          Empowering students with real-world interview preparation
        </p>
      </motion.div>

    </motion.div>
  );
};

export default Home;
