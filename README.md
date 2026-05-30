#  BashCraft Club 

> Where Innovation Meets Creativity

 >Learn from FAANG & Big 4 Professionals

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
bashcraft/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/          # Images, icons, fonts
│   ├── components/      # Reusable UI components (Navbar, Modal, Button…)
│   ├── pages/           # Full page components (Home, About, Events…)
│   ├── App.jsx          # Root component with routes
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles & CSS variables
├── index.html
├── vite.config.js
└── package.json
```

---

## CSS Variables (Defined in `src/index.css`)

| Variable          | Value                        | Use             |
|-------------------|------------------------------|-----------------|
| `--primary`       | `#E8430A`                    | Orange accent   |
| `--secondary`     | `#F26419`                    | Orange gradient |
| `--bg-dark`       | `#050505`                    | Page background |
| `--bg-charcoal`   | `#111111`                    | Card background |
| `--text-primary`  | `#ffffff`                    | Main text       |
| `--text-secondary`| `rgba(255,255,255,0.7)`      | Muted text      |
| `--glass-border`  | `rgba(255,255,255,0.1)`      | Card borders    |
| `--font-display`  | `'Space Grotesk', sans-serif`| Headings        |
| `--font-body`     | `'Inter', sans-serif`        | Body copy       |
| `--font-accent`   | `'Poppins', sans-serif`      | Labels, tags    |



---

## How to Add a New Page

1. Create `src/pages/YourPage.jsx`
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/your-page" element={<YourPage />} />
   ```

## How to Add a New Component

Create `src/components/YourComponent.jsx` (and optionally `YourComponent.module.css`).

---

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **React Router 6** — Client-side routing
- **Framer Motion** — Animations 
- **CSS Modules** — Scoped component styles

---

## Available Scripts

| Command          | Description              |
|------------------|--------------------------|
| `npm run dev`    | Start dev server         |
| `npm run build`  | Production build         |
| `npm run preview`| Preview production build |
