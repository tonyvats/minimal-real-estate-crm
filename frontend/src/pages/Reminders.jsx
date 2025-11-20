import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ReminderList from '../components/Reminder/ReminderList'
import { getNextBirthday, daysUntil } from '../utils/dateUtils'
import './Reminders.css'

const Reminders = () => {
  const [clients] = useLocalStorage('clients', [])
  const [insurances] = useLocalStorage('insurances', [])
  const [reminders, setReminders] = useLocalStorage('reminders', [])
  const [filter, setFilter] = useState('all')

  // Автоматическая генерация напоминаний
  useEffect(() => {
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
            if (!reminders.find(r => r.id === reminderId)) {
              newReminders.push({
                id: reminderId,
                client_id: client.id,
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
          if (!reminders.find(r => r.id === reminderId)) {
            newReminders.push({
              id: reminderId,
              client_id: insurance.client_id,
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
      setReminders([...reminders, ...newReminders])
    }
  }, [clients, insurances])

  const handleMarkSent = (reminderId) => {
    const updated = reminders.map(r => 
      r.id === reminderId 
        ? { ...r, is_sent: true, sent_at: new Date().toISOString() }
        : r
    )
    setReminders(updated)
  }

  const handleDelete = (reminderId) => {
    if (window.confirm('Вы уверены, что хотите удалить это напоминание?')) {
      setReminders(reminders.filter(r => r.id !== reminderId))
    }
  }

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true
    if (filter === 'upcoming') return !reminder.is_sent && daysUntil(reminder.date) >= 0
    if (filter === 'sent') return reminder.is_sent
    if (filter === 'birthday') return reminder.type === 'birthday'
    if (filter === 'insurance') return reminder.type === 'insurance'
    return true
  })

  const upcomingCount = reminders.filter(r => !r.is_sent && daysUntil(r.date) >= 0).length
  const sentCount = reminders.filter(r => r.is_sent).length

  return (
    <div className="reminders-page">
      <div className="page-header">
        <h1>Напоминания</h1>
        <div className="reminder-stats">
          <span className="stat-item upcoming">Предстоящих: {upcomingCount}</span>
          <span className="stat-item sent">Отправлено: {sentCount}</span>
        </div>
      </div>

      <div className="filters-bar">
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            className={filter === 'upcoming' ? 'active' : ''}
            onClick={() => setFilter('upcoming')}
          >
            Предстоящие
          </button>
          <button
            className={filter === 'sent' ? 'active' : ''}
            onClick={() => setFilter('sent')}
          >
            Отправленные
          </button>
          <button
            className={filter === 'birthday' ? 'active' : ''}
            onClick={() => setFilter('birthday')}
          >
            Дни рождения
          </button>
          <button
            className={filter === 'insurance' ? 'active' : ''}
            onClick={() => setFilter('insurance')}
          >
            Страховки
          </button>
        </div>
      </div>

      <div className="reminders-count">
        Найдено напоминаний: {filteredReminders.length}
      </div>

      <ReminderList
        reminders={filteredReminders}
        clients={clients}
        onMarkSent={handleMarkSent}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Reminders

