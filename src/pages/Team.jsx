import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { teamData, getImagePath } from '../constants/teams';
import styles from './Team.module.css';

// Editorial label + bold tagline shown per team on the hub page.
// Detailed descriptions still live only on each team's dedicated page.
const getTeamMeta = (team) => {
  const name = team.name.toLowerCase();
  if (name.includes('technical')) {
    return { label: 'BUILD', tagline: 'We engineer the digital backbone of Bashcraft.' };
  }
  if (name.includes('design')) {
    return { label: 'DESIGN', tagline: 'We design experiences that people remember.' };
  }
  if (name.includes('content')) {
    return { label: 'CREATE', tagline: 'We transform ideas into stories that inspire.' };
  }
  if (name.includes('event')) {
    return { label: 'ORGANIZE', tagline: 'We turn planning into unforgettable experiences.' };
  }
  if (name.includes('pr') || name.includes('outreach')) {
    return { label: 'CONNECT', tagline: 'We build partnerships that expand our impact.' };
  }
  if (name.includes('social') || name.includes('photography')) {
    return { label: 'SHOWCASE', tagline: 'We capture and showcase the Bashcraft journey.' };
  }
  return { label: 'TEAM', tagline: team.name };
};

const Team = () => {
  const location = useLocation();
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);

  const openModal = (member, teamId) => {
    setSelectedMember({ ...member, teamId });
  };
  const closeModal = () => setSelectedMember(null);
  const handleMemberClick = (member, teamId) => {
    if (selectedMember && selectedMember.id === member.id) {
      closeModal();
    } else {
      openModal(member, teamId);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedMember) closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <motion.div
          className={styles.pageAccent}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.accentDot}>OUR DNA</span>
          <span className={styles.accentLine} />
          <span className={styles.accentText}>
            Bold ideas, smart execution, and every team moving together.
          </span>
        </motion.div>

        <motion.p
          className={styles.pageIntro}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Six specialized teams.
          <br />
          One shared mission.
          <br />
          <span className={styles.pageIntroMuted}>
            Building technology, creating experiences, and empowering innovators.
          </span>
        </motion.p>

        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          OUR TEAMS
        </motion.h1>

        <motion.div
          className={styles.decorativeLines}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className={styles.line}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeInOut' }}
          />
        </motion.div>

        <nav className={styles.teamNav}>
          <ul className={styles.teamNavList}>
            {teamData.map((team) => (
              <li key={team.id} className={styles.teamNavItem}>
                <Link
                  to={`/team/${team.id}`}
                  className={`${styles.teamNavLink} ${
                    location.pathname === `/team/${team.id}` ? styles.active : ''
                  }`}
                >
                  {team.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {teamData.map((team, index) => {
          const meta = getTeamMeta(team);
          const indexLabel = `${String(index + 1).padStart(2, '0')} / ${String(
            teamData.length
          ).padStart(2, '0')}`;

          return (
            <motion.section
              key={team.id}
              id={team.id}
              className={styles.teamSection}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className={styles.sectionHeader}>
                <div className={styles.sectionHeaderTop}>
                  <span className={styles.sectionLabel}>{meta.label}</span>
                  <span className={styles.sectionIndex}>{indexLabel}</span>
                </div>
                <h2>{team.name}</h2>
                <p className={styles.teamTagline}>{meta.tagline}</p>
                <Link to={`/team/${team.id}`} className={styles.exploreCta}>
                  Explore Team <span className={styles.ctaArrow}>→</span>
                </Link>
              </div>

              <div className={styles.teamGrid}>
                {team.members.map((member, memberIndex) => {
                  const imageSrc = getImagePath(team.id, member.image);
                  const isSelected = selectedMember?.id === member.id;
                  const isHovered = hoveredMember?.id === member.id;
                  const hasAnyHover = hoveredMember !== null;
                  const isOtherHovered = hasAnyHover && !isHovered;

                  return (
                    <motion.div
                      key={member.id}
                      className={styles.memberWrapper}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      viewport={{ once: false, amount: 0.3 }}
                      animate={{
                        flex: isHovered ? '1.5' : isOtherHovered ? '0.7' : '1',
                        opacity: isOtherHovered ? 0.5 : 1,
                      }}
                      transition={{
                        default: { duration: 0.6, delay: memberIndex * 0.1, ease: 'easeOut' },
                        flex: { duration: 0.4, ease: 'easeOut' },
                        opacity: { duration: 0.3, ease: 'easeInOut' },
                      }}
                    >
                      <motion.div
                        className={`${styles.memberCard} ${isSelected ? styles.selected : ''} ${
                          isHovered ? styles.hovered : ''
                        }`}
                        onClick={() => handleMemberClick(member, team.id)}
                        onMouseEnter={() => setHoveredMember({ ...member, teamId: team.id })}
                        onMouseLeave={() => setHoveredMember(null)}
                        role="button"
                        tabIndex={0}
                        animate={{ scale: isHovered ? 1.15 : 1 }}
                        transition={{ scale: { duration: 0.4, ease: 'easeOut' } }}
                      >
                        <motion.div
                          className={styles.avatarContainer}
                          animate={isHovered ? { opacity: 0.7 } : { opacity: 1 }}
                          transition={{ opacity: { duration: 0.35, ease: 'easeInOut' } }}
                        >
                          <div className={styles.avatar}>
                            <motion.img
                              src={imageSrc}
                              alt={member.fullName}
                              loading="lazy"
                              style={
                                member.imagePosition
                                  ? { objectPosition: member.imagePosition }
                                  : undefined
                              }
                              animate={
                                isHovered
                                  ? {
                                      scale: 1.06,
                                      filter: 'brightness(0.65) contrast(1.1) saturate(0.9)',
                                    }
                                  : {
                                      scale: 1,
                                      filter: 'brightness(1) contrast(1) saturate(1)',
                                    }
                              }
                              transition={{
                                scale: { duration: 0.45, ease: 'easeOut' },
                                filter: { duration: 0.5, ease: 'easeInOut' },
                              }}
                            />
                          </div>
                        </motion.div>

                        <div className={styles.name}>{member.fullName}</div>
                        <div className={styles.role}>{member.role}</div>

                        <div className={styles.modalWord} style={{ marginTop: '0.25rem' }}>
                          <span className={styles.wordValue} style={{ fontSize: '1.2rem' }}>
                            {member.word}
                          </span>
                        </div>

                        {isHovered && !isSelected && (
                          <motion.div
                            className={styles.clickHint}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                          >
                            ↕ click to expand
                          </motion.div>
                        )}

                        {isSelected && (
                          <motion.div
                            className={styles.selectedHint}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.15 }}
                          >
                            ✓ expanded
                          </motion.div>
                        )}

                        {member.linkedin && (
                          <div className={styles.modalLinkedin} style={{ marginTop: '0.25rem' }}>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.linkedinIcon}
                              aria-label="LinkedIn profile"
                            >
                              <FaLinkedin />
                            </a>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className={styles.modalOverlay}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <button className={styles.modalClose} onClick={closeModal}>
                  ✕
                </button>
                <div className={styles.modalContent}>
                  <div className={styles.modalTop}>
                    <div className={styles.modalAvatar}>
                      <img
                        src={getImagePath(selectedMember.teamId, selectedMember.image)}
                        alt={selectedMember.fullName}
                        style={
                          selectedMember.imagePosition
                            ? { objectPosition: selectedMember.imagePosition }
                            : undefined
                        }
                      />
                    </div>
                    <div className={styles.modalHeading}>
                      <div className={styles.modalName}>{selectedMember.fullName}</div>
                      <div className={styles.modalRole}>{selectedMember.role}</div>
                    </div>
                  </div>
                  <hr className={styles.modalDivider} />
                  <div className={styles.modalSentence}>
                    “To me, this club is <strong>{selectedMember.sentence}</strong>”
                  </div>
                  <div className={styles.modalWord}>
                    <span className={styles.wordLabel}>One word that describes me:</span>
                    <span className={styles.wordValue}>{selectedMember.word}</span>
                  </div>
                  {selectedMember.linkedin && (
                    <div className={styles.modalLinkedin}>
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkedinIcon}
                        aria-label="LinkedIn profile"
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default Team;
