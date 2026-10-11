import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { KpiMetrics } from './components/Metricas'
import { WeeklyChart } from './components/InfoSemanal'
import { CalendarSection } from './components/Calendario'
import { ImpactContribution } from './components/Impacto'
import { SimulateBottleToast } from './components/Simulacion'
import {
  INITIAL_WEEKLY_DATA,
  INITIAL_MONTH_DATA
} from './data/mockData'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark') // 'dark' (default) | 'light'
  const [activeTab, setActiveTab] = useState('general') // 'general' | 'semanal' | 'calendario' | 'impacto'
  const [totalBottles, setTotalBottles] = useState(0)
  const [binBottles, setBinBottles] = useState(0)
  const [weeklyData, setWeeklyData] = useState(INITIAL_WEEKLY_DATA)
  const [monthData, setMonthData] = useState(INITIAL_MONTH_DATA)
  const [selectedDay, setSelectedDay] = useState(new Date().getDate() || 1)
  const [showToast, setShowToast] = useState(false)

  // Synchronize theme with body and html
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Play a soft pleasant audio chime using browser Web Audio API
  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const ctx = new AudioContext()

      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, now) // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12) // A5

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.35)
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Handle bottle insertion simulation (test trigger)
  const handleSimulateBottle = () => {
    playChime()

    // Update total counters
    setTotalBottles(prev => prev + 1)
    setBinBottles(prev => Math.min(prev + 1, 200))

    // Get current day code (Lun, Mar, Mié, etc.)
    const daysShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const currentDayCode = daysShort[new Date().getDay()]
    const currentDayNum = new Date().getDate()

    // Update weekly data
    setWeeklyData(prev => prev.map(d => {
      if (d.day === currentDayCode) {
        return { ...d, bottles: d.bottles + 1 }
      }
      return d
    }))

    // Update month data for current day
    setMonthData(prev => prev.map(d => {
      if (d.day === currentDayNum) {
        return { ...d, bottles: d.bottles + 1 }
      }
      return d
    }))

    // Trigger toast
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3500)
  }

  return (
    <div className="app-layout">
      {/* Toast Notification for Bottle Detection */}
      <SimulateBottleToast
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Main Top Header */}
      <Header
        onSimulateBottle={handleSimulateBottle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
      />

      <main className="dashboard-main-content">
        {/* KPI Metrics: Always visible on 'general' and relevant tabs */}
        {(activeTab === 'general' || activeTab === 'impacto') && (
          <KpiMetrics
            totalBottles={totalBottles}
            binBottles={binBottles}
            maxCapacity={200}
          />
        )}

        {/* Tab Content Rendering */}
        {activeTab === 'general' && (
          <div className="general-view-stack">
            {/* 7-Day Weekly Chart */}
            <WeeklyChart weeklyData={weeklyData} />

            {/* Calendario */}
            <CalendarSection
              monthData={monthData}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />

            {/* Contribution and Community Goal */}
            <ImpactContribution totalBottles={totalBottles} />
          </div>
        )}

        {activeTab === 'semanal' && (
          <div className="tab-standalone-view">
            <WeeklyChart weeklyData={weeklyData} />
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="tab-standalone-view">
            <CalendarSection
              monthData={monthData}
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
          </div>
        )}

        {activeTab === 'impacto' && (
          <div className="tab-standalone-view">
            <ImpactContribution totalBottles={totalBottles} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">EcoTacho Solar</span>
            <span className="footer-divider">&bull;</span>
            <span>Parroquia San Francisco de Asís</span>
          </div>
          <div className="footer-right">
            <span>Sistema Autónomo de Reciclaje Solar</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
