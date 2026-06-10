import { Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Speakers from './pages/Speakers.jsx'
import Instructions from './pages/Instructions.jsx'
import Contact from './pages/Contact.jsx'
import Timeline from './pages/Timeline.jsx'
import Login from './pages/Login.jsx'
import { useModal } from './context/ModalContext.jsx'
import LoginModal from './components/modals/LoginModal.jsx'
import RegisterModal from './components/modals/RegisterModal.jsx'
=======
import PosterModal  from './components/modals/Postermodal'
import Home         from './pages/Home'
import About        from './pages/About'
import Speakers     from './pages/Speakers'
import Timeline     from './pages/Timeline'
import Instructions from './pages/Instructions'
import Contact      from './pages/Contact'
import Login        from './pages/Login'
import Navbar       from './components/Navbar.jsx'
>>>>>>> 19714d511a157f3cb7a69fedc33a273958521cc2

export default function App() {
  const { activeModal } = useModal()

  return (
    <>
      <PosterModal />
      <Navbar />
      
      {/* Modals */}
      {activeModal === 'login' && <LoginModal />}
      {activeModal === 'register' && <RegisterModal />}

      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/timeline" element={<Timeline />} />
=======
        <Route path="/"             element={<Home />}         />
        <Route path="/about"        element={<About />}        />
        <Route path="/speakers"     element={<Speakers />}     />
        <Route path="/timeline"     element={<Timeline />}     />
        <Route path="/schedule"     element={<Timeline />}     />
>>>>>>> 19714d511a157f3cb7a69fedc33a273958521cc2
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
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
    </>
  )
}
