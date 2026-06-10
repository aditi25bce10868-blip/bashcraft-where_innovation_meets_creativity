// Home page — assign to: [your name]
// Wrap your content in <Navbar /> ... <Footer /> once those components exist.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { SPEAKERS, COMPANY_COLORS } from '../constants/speakers'; // adjust path as needed
import styles from './Home.module.css';

const Home = () => {
  const { openRegister, openLogin } = useModal();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Event date: June 13, 2026, 10:00:00
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
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, [eventDate]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      className={styles.homeContainer}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className={styles.heroGrid}>
        {/* Left Column – Main Content */}
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
              <div className={styles.timeBlock}>
                <span className={styles.timeNumber}>{String(timeLeft.days).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Days</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeBlock}>
                <span className={styles.timeNumber}>{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Hours</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeBlock}>
                <span className={styles.timeNumber}>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Mins</span>
              </div>
              <span className={styles.timeSeparator}>:</span>
              <div className={styles.timeBlock}>
                <span className={styles.timeNumber}>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className={styles.timeLabel}>Secs</span>
              </div>
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </motion.button>
            <motion.button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={openLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <Link to="/speakers">
              <motion.button
                className={`${styles.btn} ${styles.btnOutline}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

        {/* Right Column – Real Featured Speakers */}
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
                    <p>
                      {speaker.role}{' '}
                      <span className={styles.companyBadge} style={{ backgroundColor: companyColor }}>
                        {speaker.company}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

};
export default Home;
