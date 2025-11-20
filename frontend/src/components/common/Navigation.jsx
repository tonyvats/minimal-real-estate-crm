import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/clients', label: 'Клиенты', icon: '👥' },
    { path: '/deals', label: 'Сделки', icon: '💼' },
    { path: '/insurances', label: 'Страховки', icon: '🛡️' },
    { path: '/reminders', label: 'Напоминания', icon: '🔔' },
  ]

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h1>🏢 CRM</h1>
        <p className="nav-subtitle">Недвижимость</p>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation

