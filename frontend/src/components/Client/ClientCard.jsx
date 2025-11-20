import React from 'react'
import { formatDateLong, getNextBirthday, daysUntil } from '../../utils/dateUtils'
import './ClientCard.css'

const ClientCard = ({ client, onEdit, onDelete, dealsCount, insurancesCount }) => {
  const nextBirthday = client.birth_date ? getNextBirthday(client.birth_date) : null
  const daysToBirthday = nextBirthday ? daysUntil(nextBirthday) : null

  return (
    <div className="client-card">
      <div className="client-header">
        <div className="client-name">
          <h3>{client.last_name} {client.first_name} {client.middle_name}</h3>
        </div>
        <div className="client-actions">
          <button onClick={() => onEdit(client)} className="edit-btn">✏️</button>
          <button onClick={() => onDelete(client.id)} className="delete-btn">🗑️</button>
        </div>
      </div>

      <div className="client-info">
        {client.birth_date && (
          <div className="info-item">
            <span className="info-label">Дата рождения:</span>
            <span className="info-value">{formatDateLong(client.birth_date)}</span>
            {daysToBirthday !== null && daysToBirthday <= 7 && (
              <span className="birthday-badge">
                {daysToBirthday === 0 ? 'День рождения сегодня!' : `ДР через ${daysToBirthday} дн.`}
              </span>
            )}
          </div>
        )}
        
        {client.phone && (
          <div className="info-item">
            <span className="info-label">Телефон:</span>
            <span className="info-value">{client.phone}</span>
          </div>
        )}
        
        {client.email && (
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{client.email}</span>
          </div>
        )}
        
        {client.address && (
          <div className="info-item">
            <span className="info-label">Адрес:</span>
            <span className="info-value">{client.address}</span>
          </div>
        )}
      </div>

      <div className="client-stats">
        <div className="stat-item">
          <span className="stat-number">{dealsCount || 0}</span>
          <span className="stat-label">Сделок</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{insurancesCount || 0}</span>
          <span className="stat-label">Страховок</span>
        </div>
      </div>
    </div>
  )
}

export default ClientCard

