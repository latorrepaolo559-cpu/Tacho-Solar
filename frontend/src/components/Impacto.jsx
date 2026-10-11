import React, { useState } from 'react'
import { HeartHandshake, Leaf, Droplets, Sun, Zap } from 'lucide-react'
import { IMPACT_FACTORS } from '../data/mockData'

export function Impacto({ totalBottles }) {
  const [userBottles, setUserBottles] = useState(1)

  // Calculations for user's personal contribution
  const userCo2Grams = Math.round(userBottles * IMPACT_FACTORS.co2KgPerBottle * 1000)
  const userWaterLiters = (userBottles * IMPACT_FACTORS.waterLitersPerBottle).toFixed(1)
  const userLedMinutes = userBottles * IMPACT_FACTORS.ledMinutesPerBottle
  const userPlasticGrams = userBottles * IMPACT_FACTORS.plasticWeightGrams
  const carKmEquivalent = ((userBottles * IMPACT_FACTORS.co2KgPerBottle) / 0.12).toFixed(1) // ~120g CO2 per km

  // Community goal calculation
  const monthlyGoal = 500
  const currentMonthCount = totalBottles
  const goalPercent = Math.min(Math.round((currentMonthCount / monthlyGoal) * 100), 100)
  const remainingBottles = Math.max(0, monthlyGoal - currentMonthCount)

  return (
    <section className="dashboard-section impact-section" aria-label="Impacto y Contribución Comunitaria">
      <div className="section-header-row">
        <div>
          <div className="section-title-with-icon">
            <HeartHandshake className="title-icon-emerald" size={24} />
            <h2 className="section-title">¿Cuánto Ayuda Tu Contribución?</h2>
          </div>
          <p className="section-description">
            Descubre el impacto inmediato que tiene cada botella que introduces en el tacho solar.
          </p>
        </div>
      </div>

      <div className="impact-grid-container">
        {/* Card 1: Interactive Personal Calculator */}
        <div className="impact-calculator-card">
          <div className="calc-header">
            <h3 className="calc-title">Si traes botellas hoy, este es tu impacto:</h3>
          </div>

          <div className="calc-control-group">
            <div className="calc-number-display">
              <span className="calc-big-count">{userBottles}</span>
              <span className="calc-count-label">botella{userBottles > 1 ? 's' : ''} depositada{userBottles > 1 ? 's' : ''}</span>
            </div>

            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="30"
                value={userBottles}
                onChange={(e) => setUserBottles(Number(e.target.value))}
                className="bottle-range-slider"
                aria-label="Cantidad de botellas a calcular"
              />
              <div className="slider-ticks">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
              </div>
            </div>

            <div className="quick-add-buttons">
              <span className="quick-add-label">Acceso rápido:</span>
              {[1, 3, 5, 10, 15].map(qty => (
                <button
                  key={qty}
                  type="button"
                  className={`quick-pill-btn ${userBottles === qty ? 'active' : ''}`}
                  onClick={() => setUserBottles(qty)}
                >
                  +{qty}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Impact Cards */}
          <div className="dynamic-impact-results-grid">
            <div className="impact-result-tile tile-led">
              <div className="tile-icon-circle">
                <Sun size={20} />
              </div>
              <div className="tile-info">
                <span className="tile-value">
                  {userLedMinutes >= 60 ? `${(userLedMinutes / 60).toFixed(1)} hrs` : `${userLedMinutes} min`}
                </span>
                <span className="tile-label">Iluminación LED Parroquial</span>
                <p className="tile-desc">
                  Energía ahorrada suficiente para mantener encendida una luminaria LED en el patio parroquial.
                </p>
              </div>
            </div>

            <div className="impact-result-tile tile-water">
              <div className="tile-icon-circle">
                <Droplets size={20} />
              </div>
              <div className="tile-info">
                <span className="tile-value">{userWaterLiters} Litros</span>
                <span className="tile-label">Agua Potable Ahorrada</span>
                <p className="tile-desc">
                  Evitas el consumo intensivo de agua que se utiliza en el refinamiento petroquímico.
                </p>
              </div>
            </div>

            <div className="impact-result-tile tile-co2">
              <div className="tile-icon-circle">
                <Leaf size={20} />
              </div>
              <div className="tile-info">
                <span className="tile-value">{userCo2Grams} g CO₂</span>
                <span className="tile-label">Gases Invernadero Evitados</span>
                <p className="tile-desc">
                  Equivale a evitar las emisiones de conducir un vehículo por aproximadamente ~{carKmEquivalent} km.
                </p>
              </div>
            </div>

            <div className="impact-result-tile tile-plastic">
              <div className="tile-icon-circle">
                <Zap size={20} />
              </div>
              <div className="tile-info">
                <span className="tile-value">{userPlasticGrams} gramos</span>
                <span className="tile-label">Plástico Rescatado</span>
                <p className="tile-desc">
                  Polímero puro que no terminará en basurales ni en los océanos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Parish Community Goal & Laudato Si' */}
        <div className="community-goal-card">
          <div className="goal-header">
            <h3 className="goal-title">Objetivo Ecológico del Mes</h3>
          </div>

          <div className="goal-progress-box">
            <div className="goal-numbers-row">
              <div>
                <span className="goal-current-val">{currentMonthCount.toLocaleString()}</span>
                <span className="goal-total-val"> / {monthlyGoal.toLocaleString()} botellas</span>
              </div>
              <span className="goal-percent-badge">{goalPercent}% alcanzado</span>
            </div>

            <div className="goal-progress-track">
              <div
                className="goal-progress-fill"
                style={{ width: `${goalPercent}%` }}
                role="progressbar"
                aria-valuenow={goalPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>

            <div className="goal-remaining-info">
              {remainingBottles > 0 ? (
                <span>¡Faltan solo <strong>{remainingBottles} botellas</strong> para completar la meta de este mes!</span>
              ) : (
                <span className="goal-achieved-text">🎉 ¡Meta mensual superada con éxito! ¡Gracias comunidad!</span>
              )}
            </div>
          </div>

          {/* Community reward milestones */}
          <div className="milestones-list">
            <h4 className="milestones-heading">Hitos del Proyecto:</h4>
            <div className={`milestone-item ${currentMonthCount >= 500 ? 'achieved' : 'in-progress'}`}>
              <span className={currentMonthCount >= 500 ? 'milestone-check' : 'milestone-dot'}>
                {currentMonthCount >= 500 ? '✓' : ''}
              </span>
              <div>
                <strong>Hito 1 (500 Botellas):</strong> {currentMonthCount >= 500 ? 'Alcanzado ✓' : `${currentMonthCount} / 500 botellas`}
              </div>
            </div>
            <div className={`milestone-item ${currentMonthCount >= 1000 ? 'achieved' : 'in-progress'}`}>
              <span className={currentMonthCount >= 1000 ? 'milestone-check' : 'milestone-dot'}>
                {currentMonthCount >= 1000 ? '✓' : ''}
              </span>
              <div>
                <strong>Hito 2 (1,000 Botellas):</strong> {currentMonthCount >= 1000 ? 'Alcanzado ✓' : `${currentMonthCount} / 1,000 botellas`}
              </div>
            </div>
            <div className={`milestone-item ${currentMonthCount >= 1500 ? 'achieved' : 'in-progress'}`}>
              <span className={currentMonthCount >= 1500 ? 'milestone-check' : 'milestone-dot'}>
                {currentMonthCount >= 1500 ? '✓' : ''}
              </span>
              <div>
                <strong>Meta Final (1,500 Botellas)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { Impacto as ImpactContribution }
export default Impacto
