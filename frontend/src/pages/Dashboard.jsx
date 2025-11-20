import React, { useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { formatDateLong, daysUntil, getNextBirthday } from '../utils/dateUtils'
import './Dashboard.css'

const Dashboard = () => {
  const [clients] = useLocalStorage('clients', [])
  const [deals] = useLocalStorage('deals', [])
  const [insurances] = useLocalStorage('insurances', [])
  const [reminders, setReminders] = useLocalStorage('reminders', [])

  useEffect(() => {
    // Генерация напоминаний на основе данных
    setReminders(prevReminders => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const newReminders = []

      // Проверка дней рождения
      clients.forEach(client => {
        if (client.birth_date) {
          const nextBirthday = getNextBirthday(client.birth_date)
          if (nextBirthday) {
            const days = daysUntil(nextBirthday)

            if (days === 7 || days === 1 || days === 0) {
              const reminderId = `bd-${client.id}-${days}`
              if (!prevReminders.find(r => r.id === reminderId)) {
                newReminders.push({
                  id: reminderId,
                  client_id: client.id,
                  client_name: `${client.first_name} ${client.last_name}`,
                  type: 'birthday',
                  days: days,
                  message: `День рождения ${client.first_name} ${client.last_name}`,
                  date: nextBirthday.toISOString(),
                  is_sent: false
                })
              }
            }
          }
        }
      })

      // Проверка страховок
      insurances.forEach(insurance => {
        if (insurance.end_date) {
          const days = daysUntil(insurance.end_date)

          if (days === 30 || days === 7 || days === 1 || days === 0) {
            const client = clients.find(c => c.id === insurance.client_id)
            const reminderId = `ins-${insurance.id}-${days}`
            if (!prevReminders.find(r => r.id === reminderId)) {
              newReminders.push({
                id: reminderId,
                client_id: insurance.client_id,
                client_name: client ? `${client.first_name} ${client.last_name}` : 'Неизвестный клиент',
                insurance_id: insurance.id,
                type: 'insurance',
                days: days,
                message: `Страховка заканчивается ${days === 0 ? 'сегодня' : `через ${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`}`,
                date: insurance.end_date,
                is_sent: false
              })
            }
          }
        }
      })

      if (newReminders.length > 0) {
        return [...prevReminders, ...newReminders]
      }
      return prevReminders
    })
  }, [clients, insurances, setReminders])

  const upcomingReminders = reminders
    .filter(r => !r.is_sent && daysUntil(r.date) >= 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10)

  const stats = {
    totalClients: clients.length,
    totalDeals: deals.length,
    activeInsurances: insurances.filter(i => {
      const days = daysUntil(i.end_date)
      return days !== null && days >= 0
    }).length,
    upcomingEvents: reminders.filter(r => !r.is_sent && daysUntil(r.date) >= 0).length
  }

  const markReminderAsSent = (reminderId) => {
    const updated = reminders.map(r => 
      r.id === reminderId ? { ...r, is_sent: true, sent_at: new Date().toISOString() } : r
    )
    setReminders(updated)
  }

  return (
    <div className="dashboard">
      <h1>Главная панель</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalClients}</h3>
            <p>Всего клиентов</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-info">
            <h3>{stats.totalDeals}</h3>
            <p>Всего сделок</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛡️</div>
          <div className="stat-info">
            <h3>{stats.activeInsurances}</h3>
            <p>Активных страховок</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{stats.upcomingEvents}</h3>
            <p>Предстоящих событий</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Ближайшие напоминания</h2>
        {upcomingReminders.length > 0 ? (
          <div className="reminders-list">
            {upcomingReminders.map(reminder => (
              <div key={reminder.id} className="reminder-card">
                <div className="reminder-icon">
                  {reminder.type === 'birthday' ? '🎂' : '🛡️'}
                </div>
                <div className="reminder-content">
                  <h4>{reminder.message}</h4>
                  <p className="reminder-client">{reminder.client_name}</p>
                  <p className="reminder-date">
                    {formatDateLong(reminder.date)}
                  </p>
                </div>
                <div className="reminder-badge">
                  {reminder.days === 0 ? 'Сегодня' : `Через ${reminder.days} дн.`}
                </div>
                {!reminder.is_sent && (
                  <button 
                    className="reminder-mark-btn"
                    onClick={() => markReminderAsSent(reminder.id)}
                    title="Отметить как отправленное"
                  >
                    ✓
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">Нет предстоящих событий</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

