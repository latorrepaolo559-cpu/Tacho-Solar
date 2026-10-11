import React, { useState } from 'react'
import { BarChart3, Info, Award } from 'lucide-react'
import { IMPACT_FACTORS } from '../data/mockData'

export function InfoSemanal({ weeklyData }) {
  const [viewMode, setViewMode] = useState('current') // 'current' | 'lastWeek' | 'comparison'
  const [hoveredDay, setHoveredDay] = useState(null)

  // Calculate totals and statistics
  const currentTotal = weeklyData.reduce((acc, curr) => acc + curr.bottles, 0)
  const lastWeekTotal = weeklyData.reduce((acc, curr) => acc + curr.lastWeek, 0)
  const activeTotal = viewMode === 'lastWeek' ? lastWeekTotal : currentTotal
  const activeAvg = Math.round(activeTotal / 7)
  const hasData = activeTotal > 0

  // Max value for scaling chart
  const maxRaw = Math.max(
    ...weeklyData.map(d => viewMode === 'lastWeek' ? d.lastWeek : Math.max(d.bottles, d.lastWeek)),
    0
  )
  const maxVal = maxRaw > 0 ? Math.ceil(maxRaw * 1.15) : 10

  // Find peak day
  const peakDayObj = weeklyData.reduce((max, d) => {
    const valCurr = viewMode === 'lastWeek' ? d.lastWeek : d.bottles
    const valMax = viewMode === 'lastWeek' ? max.lastWeek : max.bottles
    return valCurr > valMax ? d : max
  }, weeklyData[0])

  const peakVal = viewMode === 'lastWeek' ? peakDayObj.lastWeek : peakDayObj.bottles

  return (
    <section className="dashboard-section chart-section" aria-label="Gráfica Semanal de Botellas">
      <div className="section-header-row">
        <div>
          <div className="section-title-with-icon">
            <BarChart3 className="title-icon-emerald" size={24} />
            <h2 className="section-title">Registro Semanal de Botellas (7 Días)</h2>
          </div>
          <p className="section-description">
            Monitoreo diario de botellas PET introducidas en el tacho solar durante los 7 días de la semana.
          </p>
        </div>

        <div className="chart-controls-group">
          <div className="view-pill-selector" role="radiogroup" aria-label="Modo de visualización de la gráfica">
            <button
              type="button"
              className={`pill-btn ${viewMode === 'current' ? 'active' : ''}`}
              onClick={() => setViewMode('current')}
            >
              Esta Semana
            </button>
            <button
              type="button"
              className={`pill-btn ${viewMode === 'lastWeek' ? 'active' : ''}`}
              onClick={() => setViewMode('lastWeek')}
            >
              Semana Pasada
            </button>
            <button
              type="button"
              className={`pill-btn ${viewMode === 'comparison' ? 'active' : ''}`}
              onClick={() => setViewMode('comparison')}
            >
              Comparativa
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Graphic Container */}
      <div className="chart-canvas-wrapper">
        {/* Header summary stats */}
        <div className="chart-quick-stats">
          <div className="stat-pill">
            <span className="stat-pill-label">Total Semana:</span>
            <span className="stat-pill-value">{activeTotal} botellas</span>
          </div>
          <div className="stat-pill">
            <span className="stat-pill-label">Promedio Diario:</span>
            <span className="stat-pill-value">{activeAvg} botellas/día</span>
          </div>
          <div className="stat-pill highlight-gold">
            <Award size={15} />
            <span className="stat-pill-label">Pico Semanal:</span>
            <span className="stat-pill-value">
              {hasData && peakVal > 0 ? `${peakDayObj.fullName} (${peakVal})` : 'Sin registros'}
            </span>
          </div>
        </div>

        {/* Responsive SVG / CSS Bar Chart */}
        <div className="bars-chart-container">
          {/* Average Reference Line (only if there are bottles) */}
          {hasData && (
            <div 
              className="average-ref-line" 
              style={{ bottom: `${(activeAvg / maxVal) * 82 + 10}%` }}
              title={`Promedio: ${activeAvg} botellas`}
            >
              <span className="avg-line-label">Promedio: {activeAvg}</span>
            </div>
          )}

          <div className="bars-flex-grid">
            {weeklyData.map((dayData) => {
              const currentVal = dayData.bottles
              const pastVal = dayData.lastWeek
              const displayVal = viewMode === 'lastWeek' ? pastVal : currentVal
              const heightPercent = displayVal > 0 ? (displayVal / maxVal) * 100 : 0
              const pastHeightPercent = pastVal > 0 ? (pastVal / maxVal) * 100 : 0
              const isPeak = hasData && displayVal > 0 && dayData.day === peakDayObj.day
              const isHovered = hoveredDay === dayData.day

              return (
                <div 
                  key={dayData.day}
                  className={`bar-column-wrapper ${isPeak ? 'is-peak-column' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredDay(dayData.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => setHoveredDay(hoveredDay === dayData.day ? null : dayData.day)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${dayData.fullName}: ${displayVal} botellas depositadas`}
                >
                  {/* Tooltip on hover/active */}
                  {isHovered && (
                    <div className="bar-hover-tooltip" role="tooltip">
                      <div className="tooltip-header">
                        <strong>{dayData.fullName}</strong>
                        {isPeak && <span className="tooltip-peak-tag">Día Pico</span>}
                      </div>
                      <div className="tooltip-metric">
                        <span>Botellas:</span>
                        <strong>{displayVal} unids.</strong>
                      </div>
                      <div className="tooltip-metric">
                        <span>CO₂ evitado:</span>
                        <span>{(displayVal * IMPACT_FACTORS.co2KgPerBottle).toFixed(2)} kg</span>
                      </div>
                      <div className="tooltip-metric">
                        <span>Horario estimado:</span>
                        <span>{dayData.peakHour || '--:--'}</span>
                      </div>
                      {viewMode === 'comparison' && (
                        <div className="tooltip-comparison-row">
                          <span>Semana pasada: {pastVal} ({currentVal >= pastVal ? `+${currentVal - pastVal}` : `${currentVal - pastVal}`})</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Top value badge */}
                  <div className={`bar-value-label ${isPeak ? 'peak-label' : ''}`}>
                    {displayVal}
                  </div>

                  {/* Bar Pillars */}
                  <div className="bar-pillar-track">
                    {viewMode === 'comparison' ? (
                      <div className="comparison-bars-pair">
                        <div 
                          className="bar-fill bar-fill-past" 
                          style={{ 
                            height: pastVal > 0 ? `${Math.max(6, pastHeightPercent)}%` : '4px',
                            opacity: pastVal > 0 ? 1 : 0.3
                          }}
                          title={`Semana pasada: ${pastVal}`}
                        />
                        <div 
                          className={`bar-fill bar-fill-current ${isPeak ? 'bar-peak' : ''}`} 
                          style={{ 
                            height: currentVal > 0 ? `${Math.max(6, heightPercent)}%` : '4px',
                            opacity: currentVal > 0 ? 1 : 0.3
                          }}
                          title={`Esta semana: ${currentVal}`}
                        />
                      </div>
                    ) : (
                      <div 
                        className={`bar-fill single-bar ${isPeak ? 'bar-peak' : ''}`}
                        style={{ 
                          height: displayVal > 0 ? `${Math.max(6, heightPercent)}%` : '4px',
                          opacity: displayVal > 0 ? 1 : 0.3
                        }}
                      >
                        {isPeak && <span className="peak-crown-icon" title="Día con mayor recolección">👑</span>}
                      </div>
                    )}
                  </div>

                  {/* Day Axis Label */}
                  <div className="bar-axis-label-group">
                    <span className="axis-day-short">{dayData.day}</span>
                    <span className="axis-day-full">{dayData.fullName}</span>
                    {dayData.note && <span className="axis-day-note">{dayData.note}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend and contextual explanation */}
        <div className="chart-footer-legend">
          <div className="legend-items-row">
            {viewMode === 'comparison' ? (
              <>
                <div className="legend-item">
                  <span className="legend-swatch swatch-current"></span>
                  <span>Esta Semana ({currentTotal} botellas)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-swatch swatch-past"></span>
                  <span>Semana Anterior ({lastWeekTotal} botellas)</span>
                </div>
              </>
            ) : (
              <div className="legend-item">
                <span className="legend-swatch swatch-current"></span>
                <span>Botellas depositadas por jornada diaria</span>
              </div>
            )}
            <div className="legend-item">
              <span className="legend-swatch swatch-peak"></span>
              <span>Día con mayor recolección</span>
            </div>
            {hasData && (
              <div className="legend-item">
                <span className="legend-swatch swatch-line"></span>
                <span>Línea de promedio ({activeAvg} botellas)</span>
              </div>
            )}
          </div>

          <div className="chart-insight-box">
            <Info size={16} className="insight-icon" />
            <span>
              {hasData && peakVal > 0 ? (
                <>
                  <strong>Dato clave:</strong> El día <strong>{peakDayObj.fullName}</strong> lidera con el <strong>{Math.round((peakVal / activeTotal) * 100)}%</strong> de botellas recolectadas esta semana.
                </>
              ) : (
                <>
                  <strong>Estado:</strong> Esperando que se detecten botellas en el tacho para registrar la actividad semanal.
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export { InfoSemanal as WeeklyChart }
export default InfoSemanal
