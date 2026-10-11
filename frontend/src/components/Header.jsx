import React from 'react'
import { Sun, Moon, Recycle, Wifi } from 'lucide-react'

export function Header({
  onSimulateBottle,
  activeTab,
  setActiveTab,
  theme = 'dark',
  onToggleTheme
}) {
  return (
    <header className="dashboard-header">
      <div className="header-top-banner">
        <div className="banner-badge">
          <span className="pulse-indicator"></span>
          <span>Proyecto Parroquial de Sostenibilidad</span>
        </div>
        <div className="banner-telemetry-pill">
          <span className="telemetry-item">
            <Wifi size={14} className="wifi-icon" />
            <span>Sensor: <strong>En línea</strong></span>
          </span>
        </div>
      </div>

      <div className="header-main-content">
        <div className="header-brand-group">
          <div className="brand-logo-container">
            <div className="brand-icon-wrapper">
              <Recycle className="brand-icon-recycle" size={32} />
              <Sun className="brand-icon-sun" size={20} />
            </div>
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">EcoTacho Solar</h1>
            </div>
            <p className="brand-subtitle">
              Tacho inteligente alimentado por energía solar con sensor óptico de reciclaje de botellas.
            </p>
          </div>
        </div>

        <div className="header-actions">
          {onToggleTheme && (
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label="Alternar tema visual"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={17} className="theme-toggle-icon" />
                  <span>Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon size={17} className="theme-toggle-icon" />
                  <span>Modo Oscuro</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            className="simple-sim-btn"
            onClick={onSimulateBottle}
            title="Prueba: simular detección de +1 botella"
          >
            +1 Botella (Test)
          </button>
        </div>
      </div>

      <nav className="header-tabs-nav" aria-label="Secciones del Dashboard">
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Vista General
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'semanal' ? 'active' : ''}`}
          onClick={() => setActiveTab('semanal')}
        >
          Gráfica Semanal (7 Días)
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'calendario' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendario')}
        >
          Calendario Mensual
        </button>
        <button
          type="button"
          className={`nav-tab-btn ${activeTab === 'impacto' ? 'active' : ''}`}
          onClick={() => setActiveTab('impacto')}
        >
          Calculadora de Impacto
        </button>
      </nav>
    </header>
  )
}
