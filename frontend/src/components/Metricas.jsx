import React from 'react'
import { Recycle, Trash2, Leaf, Droplets, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { IMPACT_FACTORS } from '../data/mockData'

export function Metricas({ totalBottles, binBottles, maxCapacity = 200 }) {
  const binPercentage = Math.min(Math.round((binBottles / maxCapacity) * 100), 100)
  const co2AvoidedKg = (totalBottles * IMPACT_FACTORS.co2KgPerBottle).toFixed(1)
  const waterSavedLiters = Math.round(totalBottles * IMPACT_FACTORS.waterLitersPerBottle)

  // Determine bin status color
  const isNearFull = binPercentage >= 85
  const isModerate = binPercentage >= 60

  return (
    <section className="kpi-grid-container" aria-label="Métricas Principales de Reciclaje">
      {/* KPI 1: Botellas Totales */}
      <div className="kpi-card kpi-primary">
        <div className="kpi-card-header">
          <span className="kpi-badge emerald-badge">
            <TrendingUp size={14} /> {totalBottles > 0 ? `+${totalBottles} registradas` : 'Sistema en Espera'}
          </span>
          <div className="kpi-icon-circle emerald-icon">
            <Recycle size={22} />
          </div>
        </div>
        <div className="kpi-card-body">
          <span className="kpi-label">Botellas Detectadas</span>
          <div className="kpi-value-row">
            <span className="kpi-value highlight-emerald">{totalBottles.toLocaleString()}</span>
            <span className="kpi-unit">unidades</span>
          </div>
          <p className="kpi-subtext">
            Detectadas automáticamente por el sensor óptico infrarrojo
          </p>
        </div>
      </div>

      {/* KPI 2: Capacidad del Tacho */}
      <div className={`kpi-card ${isNearFull ? 'kpi-warning' : 'kpi-neutral'}`}>
        <div className="kpi-card-header">
          <span className={`kpi-badge ${isNearFull ? 'warning-badge' : 'subtle-badge'}`}>
            {isNearFull ? (
              <>
                <AlertCircle size={14} /> Requiere vaciado pronto
              </>
            ) : (
              <>
                <CheckCircle2 size={14} /> Espacio disponible
              </>
            )}
          </span>
          <div className="kpi-icon-circle neutral-icon">
            <Trash2 size={22} />
          </div>
        </div>
        <div className="kpi-card-body">
          <span className="kpi-label">Nivel de Llenado del Tacho</span>
          <div className="kpi-value-row">
            <span className="kpi-value">{binPercentage}%</span>
            <span className="kpi-unit">({binBottles} / {maxCapacity} botellas)</span>
          </div>
          <div className="bin-progress-track">
            <div
              className={`bin-progress-bar ${isNearFull ? 'bar-alert' : isModerate ? 'bar-moderate' : 'bar-normal'}`}
              style={{ width: `${binPercentage}%` }}
              role="progressbar"
              aria-valuenow={binPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>
      </div>

      {/* KPI 3: CO2 Evitado */}
      <div className="kpi-card kpi-leaf">
        <div className="kpi-card-header">
          <span className="kpi-badge leaf-badge">
            🌿 Huella Neutralizada
          </span>
          <div className="kpi-icon-circle leaf-icon">
            <Leaf size={22} />
          </div>
        </div>
        <div className="kpi-card-body">
          <span className="kpi-label">CO₂ Evitado a la Atmósfera</span>
          <div className="kpi-value-row">
            <span className="kpi-value text-leaf">{co2AvoidedKg}</span>
            <span className="kpi-unit">kg CO₂eq</span>
          </div>
          <p className="kpi-subtext">
            {totalBottles > 0
              ? `Equivale al carbono absorbido por ~${Math.max(1, Math.round(co2AvoidedKg / 20))} árboles adultos durante un año`
              : 'Se estimará la absorción equivalente en árboles al registrar botellas'}
          </p>
        </div>
      </div>

      {/* KPI 4: Agua Ahorrada */}
      <div className="kpi-card kpi-water">
        <div className="kpi-card-header">
          <span className="kpi-badge cyan-badge">
            💧 Conservación Hídrica
          </span>
          <div className="kpi-icon-circle cyan-icon">
            <Droplets size={22} />
          </div>
        </div>
        <div className="kpi-card-body">
          <span className="kpi-label">Agua Potable Preservada</span>
          <div className="kpi-value-row">
            <span className="kpi-value text-cyan">{waterSavedLiters.toLocaleString()}</span>
            <span className="kpi-unit">litros</span>
          </div>
          <p className="kpi-subtext">
            Agua no consumida en la síntesis de resina plástica virgen
          </p>
        </div>
      </div>
    </section>
  )
}

export { Metricas as KpiMetrics }
export default Metricas
