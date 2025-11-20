import React from 'react'
import { formatDateLong, daysUntil } from '../../utils/dateUtils'
import './ReminderList.css'

const ReminderList = ({ reminders, clients, onMarkSent, onDelete }) => {
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return 'Неизвестный клиент'
    return `${client.last_name} ${client.first_name} ${client.middle_name}`
  }

  const getReminderIcon = (type) => {
    return type === 'birthday' ? '🎂' : '🛡️'
  }

  const getReminderTypeLabel = (type) => {
    return type === 'birthday' ? 'День рождения' : 'Страховка'
  }

  const getDaysLabel = (days) => {
    if (days === 0) return 'Сегодня'
    if (days === 1) return 'Завтра'
    if (days < 5) return `Через ${days} дня`
    return `Через ${days} дней`
  }

  if (reminders.length === 0) {
    return (
      <div className="empty-list">
        <p>Напоминания не найдены</p>
        <p className="empty-hint">Напоминания будут создаваться автоматически на основе данных о клиентах и страховках</p>
      </div>
    )
  }

  const sortedReminders = [...reminders].sort((a, b) => {
    // Сначала неотправленные, потом отправленные
    if (a.is_sent !== b.is_sent) {
      return a.is_sent ? 1 : -1
    }
    // Затем по дате
    return new Date(a.date) - new Date(b.date)
  })

  return (
    <div className="reminder-list">
      {sortedReminders.map(reminder => {
        const days = daysUntil(reminder.date)
        const isUpcoming = days !== null && days >= 0 && !reminder.is_sent
        
        return (
          <div 
            key={reminder.id} 
            className={`reminder-card ${reminder.is_sent ? 'sent' : ''} ${isUpcoming ? 'upcoming' : ''}`}
          >
            <div className="reminder-icon">
              {getReminderIcon(reminder.type)}
            </div>
            
            <div className="reminder-content">
              <div className="reminder-header">
                <h4>{getReminderTypeLabel(reminder.type)}</h4>
                {reminder.is_sent && (
                  <span className="sent-badge">Отправлено</span>
                )}
              </div>
              
              <p className="reminder-message">{reminder.message}</p>
              
              <div className="reminder-details">
                <span className="reminder-client">👤 {getClientName(reminder.client_id)}</span>
                <span className="reminder-date">📅 {formatDateLong(reminder.date)}</span>
                {days !== null && (
                  <span className={`reminder-days ${days <= 7 ? 'urgent' : ''}`}>
                    {getDaysLabel(days)}
                  </span>
                )}
              </div>
              
              {reminder.is_sent && reminder.sent_at && (
                <p className="sent-time">
                  Отправлено: {new Date(reminder.sent_at).toLocaleString('ru-RU')}
                </p>
              )}
            </div>

            <div className="reminder-actions">
              {!reminder.is_sent && (
                <button 
                  onClick={() => onMarkSent(reminder.id)}
                  className="mark-sent-btn"
                  title="Отметить как отправленное"
                >
                  ✓
                </button>
              )}
              <button 
                onClick={() => onDelete(reminder.id)}
                className="delete-btn"
                title="Удалить напоминание"
              >
                🗑️
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReminderList

