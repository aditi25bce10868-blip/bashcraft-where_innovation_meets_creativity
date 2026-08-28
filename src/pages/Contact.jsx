import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

// --- Official SVG Icons (Monochrome) ---
const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.51a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EmailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// --- Background Component: Floating Ambient Glows & Faint Grid ---
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Vignette Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black/90 to-black z-10" />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `radial-gradient(circle, #F5F5F0 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating Ambient Glowing Orbs — one orange, one crimson, never blended */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6A00]/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#B00020]/10 blur-[150px]"
      />
    </div>
  );
};

// --- Custom Floating Label Input ---
const FloatingInput = ({ id, label, type = 'text', value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative w-full group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full bg-neutral-900/40 backdrop-blur-md text-[#F5F5F0] px-4 pt-6 pb-2 border border-neutral-800 rounded-lg outline-none transition-all duration-300 focus:border-neutral-500 hover:border-neutral-700"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-mono tracking-wider ${
          isFocused || hasValue
            ? 'top-2 text-[#FF6A00] scale-90 -translate-x-0.5'
            : 'top-4 text-neutral-500'
        }`}
      >
        {label}
      </label>
      
      {/* Focus Glow Line — solid orange, no red/orange blend */}
      <motion.div
        initial={false}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#FF6A00] origin-left rounded-full shadow-[0_0_8px_#FF6A00]"
      />
    </div>
  );
};

// --- Custom Floating Label Textarea ---
const FloatingTextarea = ({ id, label, value, onChange, required = false, rows = 5 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative w-full group">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="peer w-full bg-neutral-900/40 backdrop-blur-md text-[#F5F5F0] px-4 pt-6 pb-2 border border-neutral-800 rounded-lg outline-none transition-all duration-300 focus:border-neutral-500 hover:border-neutral-700 resize-none"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none text-xs font-mono tracking-wider ${
          isFocused || hasValue
            ? 'top-2 text-[#FF6A00] scale-90 -translate-x-0.5'
            : 'top-4 text-neutral-500'
        }`}
      >
        {label}
      </label>

      {/* Focus Glow Line — solid orange, no red/orange blend */}
      <motion.div
        initial={false}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#FF6A00] origin-left rounded-full shadow-[0_0_8px_#FF6A00]"
      />
    </div>
  );
};

// --- Refined Contact Card ---
const RefinedContactCard = ({
  indexStr,
  category,
  title,
  subtitle,
  actionText,
  href,
  Icon,
  watermarkText,
  isWatermarkIcon = false,
  glowColor,
  bottomText,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative block bg-neutral-950/80 border border-neutral-800/80 hover:border-[#B00020] rounded-2xl p-7 transition-colors duration-300 overflow-hidden shadow-xl"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245,245,240,0.04), transparent 80%)`,
        }}
      />

      {/* Huge Watermark in Bottom-Right */}
      <div className="absolute -bottom-4 -right-4 pointer-events-none text-[#F5F5F0] opacity-[0.025] group-hover:opacity-[0.05] group-hover:scale-105 transition-all duration-500 select-none">
        {isWatermarkIcon ? (
          <Icon className="w-32 h-32" />
        ) : (
          <span className="text-8xl font-black font-sans tracking-tighter leading-none">
            {watermarkText}
          </span>
        )}
      </div>

      {/* TOP HEADER: Pill Tag & Action Button */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[10px] font-mono tracking-wider text-neutral-400">
          <span className="text-[#FF6A00] font-semibold">[ {indexStr} ]</span>
          <span className="uppercase text-neutral-300">{category}</span>
        </div>

        {/* Action Link */}
        <div className="flex items-center space-x-1 text-xs font-mono text-neutral-400 group-hover:text-[#F5F5F0] transition-colors duration-300">
          <span>{actionText}</span>
          <span className="transform group-hover:translate-x-2 transition-transform duration-300 ease-out">
            →
          </span>
        </div>
      </div>

      {/* CARD CONTENT: Icon with Glow + Titles */}
      <div className="flex items-start space-x-5 relative z-10 mb-6">
        {/* Icon Container with Brand Glow */}
        <div className="relative flex-shrink-0">
          {/* Subtle Ambient Brand Glow */}
          <div
            className="absolute -inset-2 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: glowColor }}
          />
          
          {/* Main Icon */}
          <div className="relative z-10 p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/60 text-neutral-300 group-hover:text-[#F5F5F0] transition-all duration-300 transform group-hover:scale-[1.08] group-hover:rotate-2">
            <Icon className="w-8 h-8" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="pt-0.5">
          <h3 className="text-2xl font-black tracking-tight text-[#F5F5F0] group-hover:text-[#F5F5F0] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* BOTTOM DETAIL DIVIDER & SUBTEXT */}
      <div className="pt-4 border-t border-neutral-900/90 relative z-10 flex items-center justify-between">
        <p className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
          {bottomText}
        </p>
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-[#B00020] transition-colors duration-300" />
      </div>
    </motion.a>
  );
};

// --- Main Contact Page Component ---
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardsData = [
    {
      indexStr: '01',
      category: 'NETWORK',
      title: 'LINKEDIN',
      subtitle: 'Professional Network',
      actionText: 'Connect',
      href: 'https://www.linkedin.com/company/bashcraft',
      Icon: LinkedInIcon,
      watermarkText: 'in',
      isWatermarkIcon: false,
      glowColor: 'rgba(176, 0, 32, 0.08)',
      bottomText: "Let's connect professionally",
    },
    {
      indexStr: '02',
      category: 'VISUALS',
      title: 'INSTAGRAM',
      subtitle: 'Behind the Scenes',
      actionText: 'Follow',
      href: 'https://www.instagram.com/bashcraft.vit?igsh=OWpibHJ4bWYyazU2',
      Icon: InstagramIcon,
      watermarkText: '',
      isWatermarkIcon: true,
      glowColor: 'rgba(255, 106, 0, 0.1)', // Orange accent glow
      bottomText: 'See our latest work',
    },
    {
      indexStr: '03',
      category: 'INQUIRY',
      title: 'EMAIL',
      subtitle: 'bashcraft@vitbhopal.ac.in',
      actionText: 'Send Email',
      href: 'mailto:bashcraft@vitnhopal.ac.in',
      Icon: EmailIcon,
      watermarkText: '',
      isWatermarkIcon: true,
      glowColor: 'rgba(138, 15, 26, 0.08)',
      bottomText: 'Usually replies within 24 hours',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#F5F5F0] font-sans selection:bg-[#FF6A00] selection:text-[#0D0D0D] overflow-hidden">
      <Navbar />
      <AnimatedBackground />

      <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
        
        {/* SECTION 1 — HERO */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-24 lg:mb-32 pt-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none uppercase"
          >
            HELLO@<br />
            <span className="text-[#FF6A00] hover:opacity-90 transition-opacity duration-500">
              BASHCRAFT.COM
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-8 md:mt-12 max-w-xl">
            <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
              Have an idea? Let's build something exceptional together.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <a 
              href="#form-section" 
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#FF6A00] transition-colors group"
            >
              <span>Initiate Connection</span>
              <motion.span 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#FF6A00] group-hover:translate-y-1 transition-transform"
              >
                ↓
              </motion.span>
            </a>
          </motion.div>
        </motion.section>

        {/* SECTION 2 — MAIN CONTENT */}
        <section id="form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Advanced Contact Form (60%) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-neutral-950/60 border border-neutral-900 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl relative"
          >
            {/* Ambient inner card glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6A00] block mb-2">
                // Direct Line
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                CONNECTION REQUEST
              </h2>
              <p className="text-neutral-400 text-sm mt-2 font-light">
                Have questions, ideas, or want to collaborate with us? We'd love to hear from you.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center border border-neutral-800 bg-neutral-900/30 rounded-xl p-8"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] mb-4">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-[#F5F5F0] mb-2">Connection Request Dispatched</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
                    Thank you for reaching out. A team member will evaluate your query and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormState('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-[#F5F5F0] underline underline-offset-4 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                      id="name"
                      label="YOUR NAME"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <FloatingInput
                      id="email"
                      type="email"
                      label="EMAIL ADDRESS"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <FloatingInput
                    id="subject"
                    label="SUBJECT / PROJECT TYPE"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <FloatingTextarea
                    id="message"
                    label="TELL US YOUR IDEA OR QUERY..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="group relative w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#F5F5F0] text-[#0D0D0D] font-semibold text-xs uppercase tracking-widest rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#FF6A00] hover:text-[#0D0D0D] shadow-lg hover:shadow-[#FF6A00]/25 disabled:opacity-60"
                    >
                      {formState === 'submitting' ? (
                        <div className="flex items-center space-x-2">
                          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>TRANSMITTING...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <span>INITIATE CONNECTION</span>
                          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN: Refined Interactive Cards + Metadata (40%) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Cards Stack */}
            <div className="space-y-5">
              {cardsData.map((card, idx) => (
                <RefinedContactCard key={idx} {...card} />
              ))}
            </div>

            {/* SMALL INFORMATION BLOCK (Metadata) */}
            <div className="pt-6 border-t border-neutral-900/80 grid grid-cols-3 gap-4">
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                  STATUS
                </span>
                <span className="text-xs font-medium text-neutral-300 mt-1 block">
                  Available for Projects
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                  RESPONSE
                </span>
                <span className="text-xs font-medium text-neutral-300 mt-1 block">
                  Within 24 Hours
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                  LOCATION
                </span>
                <span className="text-xs font-medium text-neutral-300 mt-1 block">
                  India
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3 — BOTTOM CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 pt-20 border-t border-neutral-900 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight max-w-4xl mx-auto">
            READY TO BUILD<br />
            <span className="text-neutral-500">SOMETHING AMAZING?</span>
          </h2>
          
          <div className="mt-10">
            <motion.a
              href="#form-section"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center px-10 py-5 bg-[#FF6A00] text-[#0D0D0D] font-mono text-xs uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(255,106,0,0.3)] hover:bg-[#B00020] hover:text-[#F5F5F0] hover:shadow-[0_0_35px_rgba(176,0,32,0.5)] transition-all duration-300"
            >
              Join Bashcraft
            </motion.a>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
