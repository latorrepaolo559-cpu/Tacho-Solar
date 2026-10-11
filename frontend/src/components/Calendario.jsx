import React from 'react'
import { Calendar, Leaf, Droplets, Sun, Award } from 'lucide-react'
import { IMPACT_FACTORS } from '../data/mockData'

export function CalendarSection({ monthData, selectedDay, onSelectDay }) {
  const currentMonthName = 'Octubre 2026'
  const totalMonthBottles = monthData.reduce((acc, curr) => acc + curr.bottles, 0)
  const activeDayData = monthData.find(d => d.day === selectedDay) || monthData[0] || { day: 1, bottles: 0, note: '' }

  const getHeatmapClass = (bottles) => {
    if (bottles === 0) return 'heat-empty'
    if (bottles < 45) return 'heat-low'
    if (bottles < 75) return 'heat-medium'
    if (bottles < 120) return 'heat-high'
    return 'heat-peak'
  }

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const firstDayOffset = 3
  const emptyPreCells = Array.from({ length: firstDayOffset })

  return (
    <section className="dashboard-section calendar-section" aria-label="Calendario de Actividad Diaria">
      <div className="section-header-row">
        <div>
          <div className="section-title-with-icon">
            <Calendar className="title-icon-emerald" size={24} />
            <h2 className="section-title">Calendario Diario de Recolección</h2>
          </div>
          <p className="section-description">
            Registro diario de botellas depositadas. Haz clic en cualquier día para explorar el impacto de esa jornada.
          </p>
        </div>

        <div className="calendar-month-selector">
          <span className="cal-month-title">{currentMonthName}</span>
          <span className="cal-month-badge">{totalMonthBottles} botellas</span>
        </div>
      </div>

      <div className="calendar-layout-grid">
        {/* Left: The Month Calendar Grid */}
        <div className="calendar-grid-card">
          <div className="calendar-weekdays-row">
            {weekDays.map(wd => (
              <div key={wd} className="weekday-header-cell">
                {wd}
              </div>
            ))}
          </div>

          <div className="calendar-days-matrix">
            {/* Empty offset cells for days before the 1st */}
            {emptyPreCells.map((_, i) => (
              <div key={`empty-${i}`} className="calendar-day-cell cell-empty" />
            ))}

            {/* Days 1 to 31 */}
            {monthData.map(dayItem => {
              const isSelected = dayItem.day === selectedDay
              const heatClass = getHeatmapClass(dayItem.bottles)
              const hasNote = Boolean(dayItem.note)
              const isSunday = (dayItem.day + firstDayOffset - 1) % 7 === 6

              return (
                <div
                  key={dayItem.day}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectDay(dayItem.day)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelectDay(dayItem.day)
                    }
                  }}
                  className={`calendar-day-cell ${heatClass} ${isSelected ? 'is-selected' : ''} ${isSunday ? 'is-sunday-cell' : ''}`}
                  aria-label={`Día ${dayItem.day}: ${dayItem.bottles} botellas${dayItem.note ? `. ${dayItem.note}` : ''}`}
                >
                  <div className="cell-top-bar">
                    <span className="cell-day-num">{dayItem.day}</span>
                    {hasNote && <span className="cell-event-dot" title={dayItem.note}></span>}
                  </div>
                  <div className="cell-bottles-count">
                    <strong>{dayItem.bottles}</strong>
                    <span className="cell-unit-label">uds</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Calendar Heatmap Legend */}
          <div className="calendar-legend-bar">
            <span className="legend-title">Nivel de reciclaje:</span>
            <div className="legend-scale">
              <span className="legend-item"><span className="legend-swatch heat-empty"></span> 0 botellas</span>
              <span className="legend-item"><span className="legend-swatch heat-low"></span> 1 - 44</span>
              <span className="legend-item"><span className="legend-swatch heat-medium"></span> 45 - 74</span>
              <span className="legend-item"><span className="legend-swatch heat-high"></span> 75 - 119</span>
              <span className="legend-item"><span className="legend-swatch heat-peak"></span> 120+</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Day Detailed Intelligence Card */}
        <div className="day-details-card">
          <div className="day-details-header">
            <div className="day-tag-pill">
              <Calendar size={14} />
              <span>Día Seleccionado</span>
            </div>
            <h3 className="day-card-title">
              {activeDayData.day} de Octubre de 2026
            </h3>
            {activeDayData.note && (
              <span className="day-card-badge">
                <Award size={13} /> {activeDayData.note}
              </span>
            )}
          </div>

          <div className="day-stats-hero">
            <div className="day-hero-number">
              <span className="day-hero-value">{activeDayData.bottles}</span>
              <span className="day-hero-label">Botellas recolectadas</span>
            </div>
          </div>

          <div className="day-impact-breakdown">
            <h4 className="breakdown-title">Impacto Ambiental de esta Jornada</h4>

            <div className="breakdown-row">
              <div className="breakdown-item">
                <div className="item-icon-wrap icon-leaf">
                  <Leaf size={16} />
                </div>
                <div>
                  <span className="item-label">CO₂ Evitado</span>
                  <span className="item-val">{(activeDayData.bottles * IMPACT_FACTORS.co2KgPerBottle).toFixed(2)} kg</span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="item-icon-wrap icon-cyan">
                  <Droplets size={16} />
                </div>
                <div>
                  <span className="item-label">Agua Preservada</span>
                  <span className="item-val">{Math.round(activeDayData.bottles * IMPACT_FACTORS.waterLitersPerBottle)} Litros</span>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="item-icon-wrap icon-solar">
                  <Sun size={16} />
                </div>
                <div>
                  <span className="item-label">Energía Ahorrada</span>
                  <span className="item-val">{((activeDayData.bottles * IMPACT_FACTORS.energyWhPerBottle) / 1000).toFixed(2)} kWh</span>
                </div>
              </div>
            </div>

            <div className="day-extra-info">
              <div className="extra-info-item">
                <span className="extra-label">Horas de bombilla LED:</span>
                <span className="extra-value">
                  {activeDayData.bottles > 0
                    ? `~${Math.round((activeDayData.bottles * IMPACT_FACTORS.ledMinutesPerBottle) / 60)} hrs de luz`
                    : '0 hrs'}
                </span>
              </div>
              <div className="extra-info-item">
                <span className="extra-label">Peso de plástico aproximado:</span>
                <span className="extra-value">
                  {activeDayData.bottles > 0
                    ? `${((activeDayData.bottles * IMPACT_FACTORS.plasticWeightGrams) / 1000).toFixed(2)} kg`
                    : '0.00 kg'}
                </span>
              </div>
            </div>
          </div>

          <div className="day-card-footer">
            <p className="day-footer-text">
              Cada botella que deposites en el tacho se registrará en el día correspondiente.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export { CalendarSection as Calendario }
export default CalendarSection
