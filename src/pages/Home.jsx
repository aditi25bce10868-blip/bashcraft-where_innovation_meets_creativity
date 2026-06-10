// Home page — assign to: [your name]
// Wrap your content in <Navbar /> ... <Footer /> once those components exist.

// Home page – complete version

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { SPEAKERS, COMPANY_COLORS } from '../constants/speakers';
import InterviewBuddy from '../assets/InterviewBuddy.jpeg';
import styles from './Home.module.css';

const Home = () => {
  const { openRegister, openLogin } = useModal();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate = new Date(2026, 5, 13, 10, 0, 0).getTime(); // June 13, 2026 10:00 AM

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <motion.div
      className={styles.homeContainer}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className={styles.heroGrid}>
        {/* LEFT COLUMN – Hero content */}
        <motion.div className={styles.heroContent} variants={fadeUp}>
          <h1 className={styles.eventTitle}>
            Tech<span>Forward</span> Summit 2026
          </h1>
          <p className={styles.eventDescription}>
            Join industry leaders, innovators, and developers for a full day
            of talks, workshops, and networking. Learn the latest in AI, cloud,
            and frontend architecture.
          </p>

          {/* Countdown timer */}
          <div className={styles.countdown}>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{timeLeft.days}</span>
              <span className={styles.countdownLabel}>Days</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{timeLeft.hours}</span>
              <span className={styles.countdownLabel}>Hours</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{timeLeft.minutes}</span>
              <span className={styles.countdownLabel}>Minutes</span>
            </div>
            <div className={styles.countdownItem}>
              <span className={styles.countdownNumber}>{timeLeft.seconds}</span>
              <span className={styles.countdownLabel}>Seconds</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button onClick={openRegister} className={styles.registerBtn}>
              Register Now
            </button>
            <button onClick={openLogin} className={styles.loginBtn}>
              Login
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN – Speakers & Sponsor */}
        <motion.div className={styles.heroVisual} variants={fadeUp}>
          <div className={styles.speakerGrid}>
            <h3 className={styles.speakerTitle}>
              ✨ Featured Speakers ✨
            </h3>

            <div className={styles.speakerCards}>
              {SPEAKERS.map((speaker) => {
                const companyColor =
                  COMPANY_COLORS[speaker.company] || speaker.color || '#888';

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
                      <span
                        className={styles.companyBadge}
                        style={{ backgroundColor: companyColor }}
                      >
                        {speaker.company}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* SPONSOR SECTION */}
            <div className={styles.sponsorSection}>
              <div className={styles.sponsorDivider}></div>
              <h3 className={styles.sponsorTitle}>🏆 Official Sponsor</h3>
              <div className={styles.sponsorCard}>
                <img
                  src={InterviewBuddy}
                  alt="InterviewBuddy"
                  className={styles.sponsorLogo}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;