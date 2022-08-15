import React, { useEffect, useRef } from "react";
import './InfoTooltip.css'

function InfoTooltip({ isOpen, onClose, children}) {
  const popup = useRef()

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    function handleOverlayClickClose(e) {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    popup.current.addEventListener('mousedown', handleOverlayClickClose);

    return () => {
      popup.current.removeEventListener('mousedown', handleOverlayClickClose);
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} ref={popup}>
      {children}
    </div>
  )
}

export default InfoTooltip;