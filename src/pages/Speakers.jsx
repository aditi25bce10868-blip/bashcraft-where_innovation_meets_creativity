import { useState } from "react";
import styles from "./Speakers.module.css";

const speakers = [
  {
    id: 1,
    name: "Azmina Poddar",
    role: "Managing Director",
    company: "JPMorganChase",
    companyColor: "#8B4513",
    bio: "Transformative design leader with 25+ years of experience. Author of 'Designer's are Oxymoron' and former design leader at IBM, BCG, and Accenture.",
    avatar: "../assets/azminaPoddar.jpeg",
    linkedin: "https://www.linkedin.com/in/azmina-poddar-azyoulikeit-9283bb7?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    social: "https://x.com/verylooni?s=20",
    website: "https://rupapublications.co.in/author-detail/azmina-poddar",
  },
  {
    id: 2,
    name: "Dr. Ashish Mittal",
    role: "Group - CHRO",
    company: "Sreenidhi Educational Group",
    companyColor: "#6B21A8",
    bio: "27 years of global HR experience. Recognized as Forbes India Top 50 HR Leaders & Asia's 100 Power Leaders in HR.",
    avatar: "../assets/ashishMittal.jpeg",
    linkedin: "https://www.linkedin.com/in/mrashishmittal?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    social: "https://www.instagram.com/itsashishmittal/?hl=en",
    website: "https://www.facebook.com/itsashishmittal/",
  },
  {
    id: 3,
    name: "Mahesh Kumar Singh",
    role: "Senior Specialist",
    company: "Ericsson",
    companyColor: "#0082F0",
    bio: "Specialist in Ericsson 5G SA & NSA, LTE, VOLTE, Cloud, and AI technologies.",
    avatar: "../assets/maheshKumarSingh.jpeg",
    linkedin: "https://www.linkedin.com/in/mahesh-kumar-singh-14ab2844/",
    social: "https://twitter.com",
    website: "https://www.linkedin.com/safety/go/?url=http%3A%2F%2Fwww.ericsson.com&urlhash=Pdx9&mt=8icABNHId2rKF0Pp18mpuud-_Fg1QP4LEpXBO9kkOOIR2hs__a-enZs3b55wtGUaK9FkWXTeL0wh5Bbpvxy-sCd6HyBa&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtOF6i14nQtagROzMfAp0lQ%3D%3D",
  },
  {
    id: 4,
    name: "Harshil Choudhry",
    role: "Director of AI",
    company: "Morgan Stanley",
    companyColor: "#005EB8",
    bio: "Director of AI at Morgan Stanley, driving artificial intelligence initiatives and strategy.",
    avatar: "../assets/harshilChoudhry.jpeg ",
    linkedin: "https://www.linkedin.com/in/harshil-chaudhary?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    social: "https://www.linkedin.com/safety/go/?url=github.com%2Fharshil-chaudhary&urlhash=qte0&mt=ruiIRiMW0looRAO3BDz2ygdOoUTcnaEAgkHa4zNgm50TpjC_4KGj0BmZ1nogHAC1TjxSZjQuavAQUFDNxeNiPoAW2gFy&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bjy19vYBqRYy%2BOSzH%2BVOHmg%3D%3D",
    website: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fmedium.com%2F%40harshilchaudhary8&urlhash=_q8h&mt=YKR4ZSVFUQiXLIHrZUGpikXBOeluj_x79XIZDkVmxeyb6mO6A5ILcHACW0m2RwcJhNjWgzVzHSq7e5TQ1ZcwVgdu6BrJ&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bjy19vYBqRYy%2BOSzH%2BVOHmg%3D%3D",
  },
  {
    id: 5,
    name: "Mukesh Kala",
    role: "Hyper Automation Practice Head",
    company: "Boundaryless Group",
    companyColor: "#003B7A",
    bio: "5x UiPath MVP, LinkedIn Top Voice, and creator of the popular YouTube channel 'Tutorials by Mukesh Kala'.",
    avatar: "../assets/mukeshKala.jpeg",
    linkedin: "https://www.linkedin.com/in/mukeshkala/",
    social: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fyoutube.com%2Fc%2FTutorialsbyMukeshKala&urlhash=mOiQ&mt=wYCT6Vt54hdiWeVX8NsL6zgGJ8sOgCAq93B9xC4RtE1SX611OvnYxpbwbX1wFvev2_17Il7XCiiYRRB1wgR2iDjAju7E&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bg5f7y6xKShucjQ3ubLSPlg%3D%3D",
    website: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fwww.mukeshkala.com&urlhash=z4Po&mt=k6oi2SAJqlk8_vwC8mD_LoDBkofCcosz8aGGLTE80CZFcIFac_GGZD4sQY2Nfrd2COOa9kdk8ldeoZgDF3RPVyYx9TGX&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bg5f7y6xKShucjQ3ubLSPlg%3D%3D",
  },
  {
    id: 6,
    name: "Saptarshi De",
    role: "SDE - 2",
    company: "Amazon",
    companyColor: "#FF9900",
    bio: "Software Development Engineer II at Amazon, building scalable software solutions.",
    avatar: "../assets/saptarshiDe.jpeg ",
    linkedin: "https://www.linkedin.com/in/saptarshi-de-5a244b139?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    social: "https://twitter.com/SaptarshiDy",
    website: "https://twitter.com/SaptarshiDy",
  },
  {
    id: 7,
    name: "Avinash Bussa",
    role: "Senior UI Designer",
    company: "QuillBot",
    companyColor: "#16A34A",
    bio: "Crafting intuitive and beautiful user experiences at QuillBot, shaping how people write and learn.",
    avatar: "",
    linkedin: "https://www.linkedin.com/in/avinash-bussa?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    social: "https://avinashbussa.medium.com/",
    website: "https://www.avinashbussa.com/",
  },
  {
    id: 8,
    name: "Parul pradhan sharma",
    role: "Deputy General Manager – Services & Technologies",
    company: "Mercedes-Benz R&D",
    companyColor: "#00ADEF", 
    bio: "Design-driven strategic leader with 23+ years of experience in automotive innovation. IIT Mumbai & IIM Bangalore alum, TEDx speaker, and mobility patent holder.",
    avatar: "../assets/parulPradhan.jpeg", 
    linkedin: "https://www.linkedin.com/in/parul-pradhan-sharma?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    social: "https://www.youtube.com/watch?v=DJW1aLpVdGQ",
    website: "https://www.linkedin.com/in/parul-pradhan-sharma",
  },
];

function SpeakerCard({ speaker, index, hoveredIndex, setHoveredIndex }) {
  const [imgFailed, setImgFailed] = useState(false);
  const isHovered = hoveredIndex === index;

  const initials = speaker.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const renderSocialIcon = (url) => {
    if (!url) return null;
    const lowerUrl = url.toLowerCase();
    
    if (lowerUrl.includes("instagram.com")) {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    }
    
    if (lowerUrl.includes("x.com") || lowerUrl.includes("twitter.com")) {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    }

    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 Bell .502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    }

    if (lowerUrl.includes("github.com")) {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.345.72-4.05-1.62-4.05-1.62-.54-1.38-1.32-1.74-1.32-1.74-1.095-.75.09-.735.09-.735 1.215.09 1.86 1.245 1.86 1.245 1.08 1.83 2.82 1.305 3.51.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.92 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.11.81 2.23 0 1.605-.015 2.895-.015 3.285 0 .315.21.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    }

    if (lowerUrl.includes("medium.com")) {
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.54 12a6.8 6.8 0 1 1-13.54 0 6.8 6.8 0 0 1 13.54 0zm6.95 0c0 3.53-1.5 6.4-3.36 6.4S13.77 15.53 13.77 12s1.5-6.4 3.36-6.4 3.36 2.87 3.36 6.4zm3.51 0c0 3.1-.3 5.63-.67 5.63s-.67-2.53-.67-5.63.3-5.63.67-5.63.67 2.53.67 5.63z"/>
        </svg>
      );
    }

    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
      </svg>
    );
  };

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.cardHovered : ""}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Avatar */}
      <div className={styles.avatarWrapper}>
        <div className={styles.avatarRing} />
        {!imgFailed && speaker.avatar ? (
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

        {/* Bio */}
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
          href={speaker.social}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={`${speaker.name} Social Profile`}
        >
          {renderSocialIcon(speaker.social)}
        </a>

        <a
          href={speaker.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
          aria-label={`${speaker.name} Website`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </a>
      </div>

      <div className={styles.cardGlow} aria-hidden="true" />
    </div>
  );
}

export default function Speakers() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const infiniteSpeakers = [...speakers, ...speakers];

  return (
    <section className={styles.section} id="speakers" role="region" aria-roledescription="carousel">
      <div className={styles.gridBg} aria-hidden="true" />

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

        <h2 className={styles.heading}>Industry Leaders &amp; Mentors</h2>
        <p className={styles.subheading}>
          Learn from professionals who've navigated successful careers at the world's most innovative companies.
        </p>
      </div>

      <div className={styles.sliderContainer}>
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
