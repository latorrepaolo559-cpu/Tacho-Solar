import React from 'react'
import { Sparkles, Recycle, X } from 'lucide-react'

export function Simulacion({ show, onClose }) {
  if (!show) return null

  return (
    <div className="bottle-toast-banner" role="alert" aria-live="assertive">
      <div className="toast-content-row">
        <div className="toast-icon-circle">
          <Recycle size={20} className="toast-recycle-icon" />
          <Sparkles size={14} className="toast-sparkle-badge" />
        </div>
        <div className="toast-text-group">
          <strong className="toast-title">¡Botella Detectada por el Sensor Óptico!</strong>
          <p className="toast-body">
            Se ha registrado 1 botella
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="toast-close-btn"
          aria-label="Cerrar notificación"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export { Simulacion as SimulateBottleToast }
export default Simulacion
