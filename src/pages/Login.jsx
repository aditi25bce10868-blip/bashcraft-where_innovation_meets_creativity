import { useState, useEffect } from "react";

// ── Firebase via CDN (loaded dynamically so preview sandbox works) ────────────
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyCDAEVjVj1ulhw-79jHIxC33_s7D_PGZDU",
  authDomain:        "bashcraft-d3560.firebaseapp.com",
  projectId:         "bashcraft-d3560",
  storageBucket:     "bashcraft-d3560.firebasestorage.app",
  messagingSenderId: "997584253338",
  appId:             "1:997584253338:web:ab362f0e8f40f240068a23",
};

// Dynamically load Firebase SDKs and return isEmailRegistered function
async function loadFirebase() {
  if (window.__firebaseReady) return window.__isEmailRegistered;

  // Load Firebase app + firestore from CDN
  await Promise.all([
    loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"),
    loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"),
  ]);

  const app = firebase.initializeApp(FIREBASE_CONFIG);
  const db  = firebase.firestore();

  window.__isEmailRegistered = async function(email) {
    const docId    = email.toLowerCase().trim();
    const snapshot = await db.collection("registered_users").doc(docId).get();
    return snapshot.exists;
  };

  window.__firebaseReady = true;
  return window.__isEmailRegistered;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Constants ─────────────────────────────────────────────────────────────────
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd85y98TEpgxMvsAgo74sDCuXnaOPfb2nJCsnSBGsxu8-Ib3A/viewform?usp=header";

function isCollegeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.(edu|ac\.in|edu\.in)$/i.test(email);
}
function openForm() {
  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconMail   = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
const IconArrow  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconGoogle = () => <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>;
const IconInfo   = () => <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{type === "success" ? "✓" : "✕"} {msg}</div>;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Navbar({ variant, onLogout }) {
  return (
    <nav className="nav">
      <a className="nav-logo" href="#"><span className="logo-icon">B</span> BashCraft</a>
      {variant === "login"   && <span className="nav-support"><IconInfo /> Support</span>}
      {variant === "webinar" && <button className="nav-back" onClick={onLogout}>Logout</button>}
    </nav>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <span>© 2024 BashCraft. All rights reserved.</span>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Help Center</a>
      </div>
    </footer>
  );
}

// ── Login Page ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail]     = useState("");
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast]     = useState(null);
  const [nudge, setNudge]     = useState(false);
  const [fbStatus, setFbStatus] = useState("idle"); // idle | loading | ready | error

  // Pre-load Firebase SDKs as soon as the page mounts
  useEffect(() => {
    setFbStatus("loading");
    loadFirebase()
      .then(() => setFbStatus("ready"))
      .catch(() => setFbStatus("error"));
  }, []);

  async function handleLogin() {
    const e = {};
    if (!email)                      e.email = "Email is required.";
    else if (!isCollegeEmail(email)) e.email = "Use your college email (.edu or .ac.in).";
    if (Object.keys(e).length) { setErrors(e); setNudge(false); return; }

    if (fbStatus !== "ready") {
      setToast({ msg: "Still connecting to database, please wait…", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const isRegistered = await window.__isEmailRegistered(email);
      if (isRegistered) {
        setNudge(false);
        setToast({ msg: "Email verified! Welcome to BashCraft.", type: "success" });
        setTimeout(() => onLogin({ email }), 900);
      } else {
        setErrors({ email: " " });
        setNudge(true);
      }
    } catch (err) {
      console.error(err);
      setToast({ msg: "Connection error. Please try again.", type: "error" });
    }
    setLoading(false);
  }

  return (
    <div className="page">
      <div className="blob" style={{ top: "-100px", left: "60%" }} />
      <Navbar variant="login" />

      <div className="center">
        <div className="card">
          <p className="card-title">Welcome Back!</p>
          <p className="card-sub">Learn directly from <span>FAANG &amp; Big 4</span> experts.</p>

          {/* Firebase status indicator */}
          {fbStatus === "loading" && (
            <div className="db-status loading">⏳ Connecting to database…</div>
          )}
          {fbStatus === "error" && (
            <div className="db-status error">⚠️ Database unavailable. Check your connection.</div>
          )}
          {fbStatus === "ready" && (
            <div className="db-status ready">🟢 Database connected</div>
          )}

          {/* Email field */}
          <div className="field">
            <label>College Email Address</label>
            <div className="input-wrap">
              <span className="icon"><IconMail /></span>
              <input
                type="email" value={email}
                onChange={v => { setEmail(v.target.value); setErrors({}); setNudge(false); }}
                placeholder="name@college.ac.in"
                className={errors.email && errors.email !== " " ? "err" : ""}
                autoComplete="off"
              />
            </div>
            {errors.email && errors.email !== " " && (
              <p className="err-msg"><IconInfo /> {errors.email}</p>
            )}
          </div>

          {/* Not-registered nudge */}
          {nudge && (
            <div className="nudge">
              <div className="nudge-left">
                <span className="nudge-icon">👋</span>
                <div className="nudge-text">
                  <strong>Not registered yet!</strong>
                  <em>{email}</em> wasn't found. Fill the Google Form to get your seat.
                </div>
              </div>
              <button className="nudge-btn" onClick={openForm}>Register →</button>
            </div>
          )}

          <button className="btn-primary" onClick={handleLogin} disabled={loading || fbStatus === "loading"}>
            {loading ? <span className="spinner" /> : <><span>Verify Email</span><IconArrow /></>}
          </button>

          <div className="divider">or</div>
          <button className="btn-google"><IconGoogle /> Sign in with Google</button>

          <p className="switch-txt">
            Not registered? <a onClick={openForm}>Fill the Google Form</a>
          </p>
        </div>
      </div>

      <Footer />
      {toast && <Toast {...toast} onDone={() => setToast(null)} />}
    </div>
  );
}


// ── Webinar Page ──────────────────────────────────────────────────────────────
// JUST FOR DEMO 
const MENTORS = [
  { name: "Arjun Mehta",  company: "Google",    color: "#4285F4", initials: "AM" },
  { name: "Priya Nair",   company: "Meta",       color: "#1877F2", initials: "PN" },
  { name: "Rahul Sharma", company: "Amazon",     color: "#FF9900", initials: "RS" },
  { name: "Sneha Gupta",  company: "Microsoft",  color: "#00A4EF", initials: "SG" },
];

function WebinarPage({ user, onLogout }) {
  return (
    <div className="page">
      <div className="blob" style={{ top: "20%", left: "50%", transform: "translateX(-50%)" }} />
      <Navbar variant="webinar" onLogout={onLogout} />

      <div className="confirm-page">
        <div className="confirm-badge">🎉</div>
        <h1 className="confirm-title">You're In!</h1>
        <p className="confirm-sub">
          Your seat is confirmed. A confirmation was sent to <strong>{user.email}</strong>.
        </p>

        <div className="webinar-card">
          <span className="webinar-tag">Live Webinar</span>
          <p className="webinar-title">Breaking into FAANG — Strategies from the Inside</p>
          <div className="webinar-rows">
            <div className="webinar-row">📅 <strong>Date:</strong> Saturday, 21 June 2025 · 5:00 PM IST</div>
            <div className="webinar-row">🎙️ <strong>Format:</strong> Live Q&amp;A + Panel Discussion</div>
            <div className="webinar-row">🔗 <strong>Platform:</strong> Zoom (link sent via email)</div>
          </div>
          <div className="mentor-chips">
            {MENTORS.map(m => (
              <div className="chip" key={m.name}>
                <div className="chip-av" style={{ background: m.color }}>{m.initials}</div>
                {m.name} · {m.company}
              </div>
            ))}
          </div>
        </div>

        <button className="btn-primary" style={{ maxWidth: 320 }} onClick={onLogout}>
          Back to Login
        </button>
      </div>

      <Footer />
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#0e0d0c; --card:#1c1916; --border:#2a2520; --accent:#f05a1a;
    --accent-h:#ff6b2b; --muted:#6b6057; --text:#f0ebe4; --sub:#9b8f84;
    --error:#e84040; --success:#3ecf6e; --input-bg:#131110;
    --font-h:'Syne',sans-serif; --font-b:'DM Sans',sans-serif;
  }
  body { background:var(--bg); color:var(--text); font-family:var(--font-b); min-height:100vh; -webkit-font-smoothing:antialiased; }
  body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; z-index:0; }
  .blob { position:fixed; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(240,90,26,.12) 0%,transparent 70%); pointer-events:none; z-index:0; filter:blur(40px); }
  .page { position:relative; z-index:1; min-height:100vh; display:flex; flex-direction:column; }
  .nav { display:flex; align-items:center; justify-content:space-between; padding:18px 36px; border-bottom:1px solid var(--border); backdrop-filter:blur(12px); position:sticky; top:0; z-index:10; background:rgba(14,13,12,.75); }
  .nav-logo { display:flex; align-items:center; gap:10px; font-family:var(--font-h); font-weight:800; font-size:1.2rem; color:var(--text); text-decoration:none; }
  .logo-icon { width:32px; height:32px; background:var(--accent); border-radius:6px; display:grid; place-items:center; font-size:.75rem; font-weight:800; color:#fff; }
  .nav-support { font-size:.85rem; color:var(--sub); display:flex; align-items:center; gap:6px; cursor:pointer; }
  .nav-back { background:none; border:none; color:var(--sub); display:flex; align-items:center; gap:6px; cursor:pointer; font-family:var(--font-b); font-size:.9rem; transition:color .2s; }
  .nav-back:hover { color:var(--text); }
  .center { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 20px; }
  .card { width:100%; max-width:460px; background:var(--card); border:1px solid var(--border); border-radius:16px; padding:40px 36px; box-shadow:0 32px 80px rgba(0,0,0,.5); animation:fadeUp .4s ease both; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  .card-title { font-family:var(--font-h); font-size:2rem; font-weight:800; line-height:1.15; margin-bottom:6px; }
  .card-sub { font-size:.9rem; color:var(--sub); margin-bottom:28px; line-height:1.5; }
  .card-sub span { color:var(--accent); font-weight:500; }
  .field { margin-bottom:18px; }
  .field label { display:block; font-size:.8rem; font-weight:500; color:var(--sub); letter-spacing:.04em; text-transform:uppercase; margin-bottom:7px; }
  .input-wrap { position:relative; display:flex; align-items:center; }
  .input-wrap .icon { position:absolute; left:14px; color:var(--muted); pointer-events:none; display:flex; }
  .input-wrap input { width:100%; background:var(--input-bg); border:1px solid var(--border); border-radius:8px; padding:12px 14px 12px 40px; color:var(--text); font-family:var(--font-b); font-size:.95rem; outline:none; transition:border-color .2s,box-shadow .2s; }
  .input-wrap input::placeholder { color:var(--muted); }
  .input-wrap input:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(240,90,26,.12); }
  .input-wrap input.err { border-color:var(--error); }
  .err-msg { font-size:.78rem; color:var(--error); margin-top:5px; display:flex; align-items:center; gap:4px; }
  .btn-primary { width:100%; padding:14px; background:var(--accent); border:none; border-radius:8px; color:#fff; font-family:var(--font-h); font-size:1rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background .2s,transform .1s,box-shadow .2s; box-shadow:0 4px 20px rgba(240,90,26,.3); letter-spacing:.02em; }
  .btn-primary:hover { background:var(--accent-h); }
  .btn-primary:active { transform:scale(.98); }
  .btn-primary:disabled { opacity:.5; cursor:not-allowed; }
  .divider { display:flex; align-items:center; gap:12px; margin:20px 0; color:var(--muted); font-size:.8rem; text-transform:uppercase; letter-spacing:.08em; }
  .divider::before,.divider::after { content:''; flex:1; height:1px; background:var(--border); }
  .btn-google { width:100%; padding:12px; background:transparent; border:1px solid var(--border); border-radius:8px; color:var(--sub); font-family:var(--font-b); font-size:.9rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; transition:border-color .2s,color .2s; }
  .btn-google:hover { border-color:var(--sub); color:var(--text); }
  .switch-txt { text-align:center; margin-top:22px; font-size:.88rem; color:var(--sub); }
  .switch-txt a { color:var(--accent); cursor:pointer; font-weight:500; }
  .switch-txt a:hover { text-decoration:underline; }
  .nudge { display:flex; align-items:center; justify-content:space-between; gap:12px; background:rgba(240,90,26,.08); border:1px solid rgba(240,90,26,.3); border-radius:10px; padding:13px 16px; margin-bottom:18px; animation:nudgeIn .35s cubic-bezier(.34,1.3,.64,1) both; }
  @keyframes nudgeIn { from{opacity:0;transform:scale(.96) translateY(-6px)} to{opacity:1;transform:scale(1) translateY(0)} }
  .nudge-left { display:flex; align-items:flex-start; gap:10px; }
  .nudge-icon { font-size:1.1rem; line-height:1; margin-top:1px; }
  .nudge-text { font-size:.82rem; color:var(--sub); line-height:1.5; }
  .nudge-text strong { color:var(--text); display:block; margin-bottom:1px; }
  .nudge-btn { flex-shrink:0; background:var(--accent); border:none; border-radius:7px; color:#fff; font-family:var(--font-h); font-size:.8rem; font-weight:700; padding:8px 14px; cursor:pointer; white-space:nowrap; transition:background .2s; }
  .nudge-btn:hover { background:var(--accent-h); }
  .db-status { font-size:.78rem; padding:8px 12px; border-radius:7px; margin-bottom:16px; }
  .db-status.loading { background:rgba(155,143,132,.08); color:var(--sub); border:1px solid var(--border); }
  .db-status.ready   { background:rgba(62,207,110,.08); color:var(--success); border:1px solid rgba(62,207,110,.25); }
  .db-status.error   { background:rgba(232,64,64,.08);  color:var(--error);   border:1px solid rgba(232,64,64,.25); }
  .toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); padding:12px 22px; border-radius:10px; font-size:.88rem; font-weight:500; display:flex; align-items:center; gap:10px; box-shadow:0 8px 32px rgba(0,0,0,.4); z-index:1000; animation:toastIn .3s ease both; white-space:nowrap; }
  .toast.success { background:#0d2b1a; border:1px solid var(--success); color:var(--success); }
  .toast.error   { background:#2b0d0d; border:1px solid var(--error);   color:var(--error); }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(14px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  .confirm-page { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; text-align:center; }
  .confirm-badge { width:72px; height:72px; background:rgba(62,207,110,.12); border:1.5px solid var(--success); border-radius:50%; display:grid; place-items:center; margin:0 auto 24px; font-size:1.8rem; animation:pop .4s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes pop { from{transform:scale(.4);opacity:0} to{transform:scale(1);opacity:1} }
  .confirm-title { font-family:var(--font-h); font-size:2.4rem; font-weight:800; margin-bottom:10px; }
  .confirm-sub { color:var(--sub); max-width:400px; line-height:1.6; margin-bottom:36px; }
  .webinar-card { width:100%; max-width:480px; background:var(--card); border:1px solid var(--border); border-radius:14px; padding:28px 32px; text-align:left; margin-bottom:28px; animation:fadeUp .5s .2s ease both; }
  .webinar-tag { display:inline-block; background:rgba(240,90,26,.15); border:1px solid rgba(240,90,26,.3); color:var(--accent); font-size:.72rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; border-radius:4px; padding:3px 10px; margin-bottom:16px; }
  .webinar-title { font-family:var(--font-h); font-size:1.3rem; font-weight:700; margin-bottom:16px; }
  .webinar-rows { display:flex; flex-direction:column; gap:10px; }
  .webinar-row { display:flex; align-items:center; gap:10px; font-size:.88rem; color:var(--sub); }
  .webinar-row strong { color:var(--text); }
  .mentor-chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
  .chip { display:flex; align-items:center; gap:7px; background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:20px; padding:5px 12px 5px 5px; font-size:.82rem; color:var(--sub); }
  .chip-av { width:24px; height:24px; border-radius:50%; display:grid; place-items:center; font-size:.65rem; font-weight:700; color:#fff; }
  .footer { border-top:1px solid var(--border); padding:18px 36px; display:flex; align-items:center; justify-content:space-between; font-size:.78rem; color:var(--muted); }
  .footer-links { display:flex; gap:20px; }
  .footer-links a { color:var(--muted); text-decoration:none; }
  .footer-links a:hover { color:var(--sub); }
  .spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,.3); border-top-color:#fff; border-radius:50%; animation:spin .6s linear infinite; }
  @keyframes spin { to{transform:rotate(360deg)} }
`;

export default function Login() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  return (
    <>
      <style>{CSS}</style>
      {page === "login" && (
        <LoginPage onLogin={u => { setUser(u); setPage("webinar"); }} />
      )}
      {page === "webinar" && (
        <WebinarPage user={user} onLogout={() => { setUser(null); setPage("login"); }} />
      )}
    </>
  );
}
