import { Routes, Route } from 'react-router-dom';
import Home         from './pages/Home';
import About        from './pages/About';
import Speakers     from './pages/Speakers';
import Instructions from './pages/Instructions';
import Contact      from './pages/Contact';
import Login        from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/"             element={<Home />}         />
      <Route path="/about"        element={<About />}        />
      <Route path="/speakers"     element={<Speakers />}     />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/contact"      element={<Contact />}      />
      <Route path="/login"        element={<Login />}        />
      <Route path="*" element={
        <div style={{ display:'grid', placeItems:'center', minHeight:'100vh',
                      fontFamily:'var(--font-display)', color:'var(--text-secondary)' }}>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontSize:'4rem', margin:0 }}>404</p>
            <p>Page not found</p>
            <a href="/" style={{ color:'var(--primary)', marginTop:'1rem', display:'block' }}>
              ← Back to home
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}
