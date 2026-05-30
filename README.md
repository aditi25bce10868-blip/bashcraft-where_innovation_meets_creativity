#  BashCraft Club

> Where Innovation Meets Creativity

> Connect with FAANG & Big 4 professionals — mentorship, live sessions, and career guidance.

![Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Stack](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![Stack](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)


---

## 📁 Project Structure
```
bashcraft/
│
├── 📁 src/                              ← Frontend (React + Vite)
│   ├── components/
│   │   ├── Navbar.jsx                   ← Sticky navigation
│   │   ├── Navbar.module.css
│   │   ├── modals/
│   │   │   ├── RegisterModal.jsx        ← Registration form
│   │   │   ├── LoginModal.jsx           ← User login form
│   │   │   └── Modal.module.css
│   │
│   ├── context/
│   │   └── ModalContext.jsx             ← Global modal state
│   │
│   ├── hooks/
│   │   └── useAuth.js                   ← Auth utilities
│   │
│   ├── services/
│   │   └── api.js                       ← Backend API calls
│   │
│   ├── pages/
│   │   ├── Home.jsx                     ← Landing page
│   │   ├── About.jsx                    ← About BashCraft event
│   │   ├── Speakers.jsx                 ← Speaker showcase section
│   │   ├── Instructions.jsx             ← Event guidelines & instructions
│   │   ├── Contact.jsx                  ← Contact details & form
│   │   └── Login.jsx                    ← Dedicated login page
│   │
│   ├── assets/                          ← Images, logos, icons
│   │
│   ├── App.jsx                          ← Routes & providers
│   ├── main.jsx                         ← React entry point
│   └── index.css                        ← Global styles
│
├── 📁 backend/                          ← Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                        ← Database configuration
│   │
│   ├── models/
│   │   └── Attendee.js                  ← name, email, college, etc.
│   │
│   ├── routes/
│   │   └── auth.js                      ← POST /register, POST /login
│   │
│   ├── middleware/
│   │   └── errorHandler.js              ← Global error handler
│   │
│   ├── server.js                        ← Express entry point
│   ├── package.json
│   └── .env.example                     ← Backend environment template
│
├── index.html
├── vite.config.js
├── package.json
├── .env.example                         ← Frontend environment template
├── README.md


```
---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- A database account (MongoDB Atlas or Firebase — TBD by backend team)

### Step 1 — Clone & install

```bash
# Frontend dependencies
cd bashcraft
npm install

# Backend dependencies
cd backend
npm install
```

### Step 2 — Environment files

**Frontend** — create `bashcraft/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** — create `bashcraft/backend/.env`:
```env
PORT=5000
DB_URI=<your_database_connection_string>
CLIENT_URL=http://localhost:5173
```

> Backend team: fill `DB_URI` based on whichever database is chosen.

### Step 3 — Run (two terminals)

```bash
# Terminal 1 — Backend
cd bashcraft/backend
npm run dev        # http://localhost:5000

# Terminal 2 — Frontend
cd bashcraft
npm run dev        # http://localhost:5173
```

---



## 🎨 Design System

All design tokens live in `src/index.css` as CSS variables.

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary` | `#E8430A` | Orange accent, buttons, highlights |
| `--secondary` | `#F26419` | Gradient end, hover states |
| `--bg-dark` | `#050505` | Page background |
| `--bg-charcoal` | `#111111` | Card / modal background |
| `--text-primary` | `#ffffff` | Main text |
| `--text-secondary` | `rgba(255,255,255,0.7)` | Muted / subtitle text |
| `--glass-border` | `rgba(255,255,255,0.1)` | Card borders |
| `--font-display` | `'Space Grotesk'` | Headings, logo |
| `--font-body` | `'Inter'` | Body copy, inputs |
| `--font-accent` | `'Poppins'` | Labels, tags, signatures |



**Open modals from any component:**
```jsx
import { useModal } from '../context/ModalContext'

const { openRegister, openLogin } = useModal()
<button onClick={openRegister}>Join Us</button>
```

---

## 🧩 How to Add a New Page

1. Create `src/pages/NewPage.jsx`
2. Register the route in `src/App.jsx`:

```jsx
import NewPage from './pages/NewPage.jsx'
// inside <Routes>:
<Route path="/new-page" element={<NewPage />} />
```

## 🧩 How to Add a New Component

```
src/components/MyComponent.jsx
src/components/MyComponent.module.css   ← scoped styles
```

Never use hardcoded hex values — always reference `var(--primary)` etc.

---

## 🚀 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com), set root to `bashcraft/`
3. Add env var: `VITE_API_URL` = your deployed backend URL
4. Deploy

### Backend → Render
1. New Web Service on [render.com](https://render.com), root = `bashcraft/backend`
2. Build: `npm install` · Start: `node server.js`
3. Add env vars: `Database_URI`, `CLIENT_URL` (Vercel URL), `PORT=5000`
4. Deploy

---

## 🛠️ Available Scripts

### Frontend (`bashcraft/`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

### Backend (`bashcraft/backend/`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start without nodemon (production) |

---



## 📚 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 5, React Router 6, Framer Motion |
| Styling | CSS Modules + CSS Variables |
| Backend | Node.js, Express 4 |
| Database | TBD by team |
| Deployment | Vercel (frontend) + Render (backend) |

---

*Built with 🔥 by the BashCraft team.*
