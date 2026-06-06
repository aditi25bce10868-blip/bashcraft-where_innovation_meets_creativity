import { useState } from "react";
import styles from "./Speakers.module.css";

const speakers = [
  {
    id: 1,
    name: "John Snow",
    role: "Senior Security Engineer",
    company: "Google",
    companyColor: "#4285F4",
    bio: "10+ years in offensive security. Led red team ops for GCP infrastructure.",
    avatar: "https://i.pravatar.cc/150?img=11",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "Keynote",
  },
  {
    id: 2,
    name: "Happy Hogan",
    role: "AI/ML Research Lead",
    company: "Microsoft",
    companyColor: "#00A4EF",
    bio: "Pioneering adversarial ML research. Contributor to MITRE ATT&CK.",
    avatar: "https://i.pravatar.cc/150?img=47",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "Workshop",
  },
  {
    id: 3,
    name: "May Parker",
    role: "Malware Analyst",
    company: "CrowdStrike",
    companyColor: "#FF6B35",
    bio: "Reverse engineering specialist. Author of open-source IDA Pro plugins.",
    avatar: "https://i.pravatar.cc/150?img=12",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "Talk",
  },
  {
    id: 4,
    name: "Kanye West",
    role: "Cloud Security Architect",
    company: "Amazon",
    companyColor: "#FF9900",
    bio: "Designed zero-trust architectures for AWS enterprise customers.",
    avatar: "https://i.pravatar.cc/150?img=45",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "Panel",
  },
  {
    id: 5,
    name: "Bruce Wayne",
    role: "Penetration Tester",
    company: "Meta",
    companyColor: "#1877F2",
    bio: "CTF champion. Specialized in mobile and firmware security assessments.",
    avatar: "https://i.pravatar.cc/150?img=15",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "CTF",
  },
  {
    id: 6,
    name: "Diana Prince",
    role: "DevSecOps Engineer",
    company: "Deloitte",
    companyColor: "#86BC25",
    bio: "Integrates security into CI/CD pipelines at scale. CISSP certified.",
    avatar: "https://i.pravatar.cc/150?img=48",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
    tag: "Workshop",
  },
];

const tagColors = {
  Keynote: { bg: "#FF6B2B", text: "#fff" },
  Workshop: { bg: "#1e3a2f", text: "#4ade80" },
  Talk: { bg: "#1e2d3a", text: "#60a5fa" },
  Panel: { bg: "#2a1f3a", text: "#c084fc" },
  CTF: { bg: "#3a1f1f", text: "#f87171" },
};

function SpeakerCard({ speaker, index, hoveredIndex, setHoveredIndex }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isHovered = hoveredIndex === index;

  const initials = speaker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Tag badge */}
      <span
        className={styles.tagBadge}
        style={{
          background: tagColors[speaker.tag]?.bg || "#222",
          color: tagColors[speaker.tag]?.text || "#fff",
        }}
      >
        {speaker.tag}
      </span>

      {/* Avatar */}
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarRing} />
        {!imgFailed ? (
          <img
            src={speaker.avatar}
            alt={speaker.name}
            className={styles.avatar}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className={styles.avatarFallback}>{initials}</div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.name}>{speaker.name}</h3>
        <p className={styles.role}>{speaker.role}</p>

        {/* Company badge */}
        <span
          className={styles.companyBadge}
          style={{ color: speaker.companyColor }}
        >
          {speaker.company}
        </span>

        {/* Bio — revealed smoothly within fixed heights */}
        <p className={`${styles.bio} ${isHovered ? styles.bioVisible : ""}`}>
          {speaker.bio}
        </p>
      </div>

      {/* Social links */}
      <div className={styles.socials}>
        <a
          href={speaker.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={`${speaker.name} LinkedIn`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          href={speaker.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={`${speaker.name} Twitter`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={speaker.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={`${speaker.name} website`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </a>
      </div>

      {/* Hover glow border */}
      <div className={styles.cardGlow} aria-hidden="true" />
    </div>
  );
}

export default function Speakers() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const infiniteSpeakers = [...speakers, ...speakers];

  return (
    <section className={styles.section} id="speakers" role="region" aria-roledescription="carousel">
      {/* Decorative grid background */}
      <div className={styles.gridBg} aria-hidden="true" />

      {/* Section header */}
      <div className={styles.headerWrapper}>
        <span className={styles.eyebrow}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Meet The Experts
        </span>

        <h2 className={styles.heading}>
          Industry Leaders &amp; Mentors
        </h2>
        <p className={styles.subheading}>
          Learn from professionals who've navigated successful careers at the
          world's most innovative companies.
        </p>
      </div>

      {/* Hidden scrollbar slider shell */}
      <div className={styles.sliderContainer}>
        {/* Infinite scrolling track wrapper */}
        <div className={styles.scrollTrack}>
          {infiniteSpeakers.map((speaker, i) => (
            <SpeakerCard 
              key={`${speaker.id}-node-${i}`}
              speaker={speaker}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
