import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Deals from './pages/Deals'
import Insurances from './pages/Insurances'
import Reminders from './pages/Reminders'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/insurances" element={<Insurances />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

