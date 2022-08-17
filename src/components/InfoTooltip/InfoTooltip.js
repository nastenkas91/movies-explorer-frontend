import React, { useEffect, useRef } from "react";
import './InfoTooltip.css'
import failLogo from '../../images/fail.svg';
import successLogo from '../../images/success.svg';

function InfoTooltip({ infoTooltip, onClose }) {
  const infotooltip = useRef()

  const { isOpen, text, success } = infoTooltip;

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
    infotooltip.current.addEventListener('mousedown', handleOverlayClickClose);

    return () => {
      infotooltip.current.removeEventListener('mousedown', handleOverlayClickClose);
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return (
    <div className={`infotooltip ${isOpen ? 'infotooltip_opened' : ''}`} ref={infotooltip}>
      <div className="infotooltip__container">
        <button aria-label="Закрыть" type="button" className="infotooltip__close-btn" onClick={onClose} ></button>
        <img src={success ? successLogo : failLogo} alt='info' className='infotooltip__picture'/>
        <p className="infotooltip__text">{text}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;