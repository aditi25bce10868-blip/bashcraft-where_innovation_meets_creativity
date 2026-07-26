import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { teamData, getImagePath } from '../constants/teams';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './Team.module.css';

const TeamDetail = () => {
  const { teamId } = useParams();
  const team = teamData.find((t) => t.id === teamId);
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember({ ...member, teamId: team.id });
  };
  const closeModal = () => setSelectedMember(null);
  const handleMemberClick = (member) => {
    if (selectedMember && selectedMember.id === member.id) {
      closeModal();
    } else {
      openModal(member);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedMember) closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  if (!team) {
    return (
      <>
        <Navbar />
        <div className={styles.pageWrapper} style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h2>Team not found</h2>
          <Link to="/team" style={{ color: '#ff0000' }}>← Back to all teams</Link>
        </div>
        <Footer />
      </>
    );
  }

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
          <span className={styles.accentDot}>DEPARTMENT</span>
          <span className={styles.accentLine} />
          <span className={styles.accentText}>
            {team.name} · {team.members.length} members
          </span>
        </motion.div>

        <motion.h1
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {team.name}
        </motion.h1>

        <motion.p
          className={styles.pageSub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {team.description}
        </motion.p>

        <motion.div
          className={styles.decorativeLines}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className={styles.line}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className={styles.teamGrid} style={{ marginTop: '2rem' }}>
          {team.members.map((member) => {
            const imageSrc = getImagePath(team.id, member.image);
            const isTeamLead = member.role.toLowerCase().includes('team lead');
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
                viewport={{ once: true, amount: 0.2 }}
                animate={{
                  flex: isHovered ? '1.5' : isOtherHovered ? '0.7' : '1',
                  opacity: isOtherHovered ? 0.5 : 1,
                }}
                transition={{
                  default: { duration: 0.6, ease: 'easeOut' },
                  flex: { duration: 0.4, ease: 'easeOut' },
                  opacity: { duration: 0.3, ease: 'easeInOut' },
                }}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <motion.div
                  className={`${styles.memberCard} ${isSelected ? styles.selected : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleMemberClick(member)}
                  animate={{ scale: isHovered ? 1.15 : 1 }}
                  transition={{ scale: { duration: 0.4, ease: 'easeOut' } }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleMemberClick(member)}
                >
                  <div className={styles.teamTag}>{team.name}</div>

                  {isTeamLead && (
                    <div className={styles.leadBadge}>
                      <span className={styles.badgeLabel}>TEAM LEAD</span>
                    </div>
                  )}

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

                  {isHovered && (
                    <motion.div
                      className={styles.previewHint}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      
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
                        onClick={(e) => e.stopPropagation()}
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

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/team" className={styles.teamNavLink} style={{ fontSize: '0.9rem' }}>
            ← Back to all teams
          </Link>
        </div>

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

export default TeamDetail;
