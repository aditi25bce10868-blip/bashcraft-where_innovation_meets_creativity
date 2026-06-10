import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null) // 'register' | 'login' | null

 const openRegister = () => {
  window.open("https://docs.google.com/forms/d/e/1FAIpQLSd85y98TEpgxMvsAgo74sDCuXnaOPfb2nJCsnSBGsxu8-Ib3A/viewform?usp=header", "_blank")
}
  const openLogin    = () => setActiveModal('login')
  const closeModal   = () => setActiveModal(null)

  return (
    <ModalContext.Provider value={{ activeModal, openRegister, openLogin, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used inside ModalProvider')
  return ctx
}
