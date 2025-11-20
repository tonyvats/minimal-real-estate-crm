import React from 'react'
import { formatDateLong, daysUntil, isDatePast } from '../../utils/dateUtils'
import './InsuranceList.css'

const InsuranceList = ({ insurances, clients, onEdit, onDelete }) => {
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return 'Неизвестный клиент'
    return `${client.last_name} ${client.first_name} ${client.middle_name}`
  }

  const formatAmount = (amount) => {
    if (!amount) return 'Не указано'
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusInfo = (endDate) => {
    if (!endDate) return { text: 'Не указано', class: 'status-unknown' }
    
    const days = daysUntil(endDate)
    const isPast = isDatePast(endDate)

    if (isPast) {
      return { text: 'Истекла', class: 'status-expired' }
    } else if (days <= 7) {
      return { text: `Истекает через ${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`, class: 'status-expiring' }
    } else if (days <= 30) {
      return { text: `Истекает через ${days} дней`, class: 'status-warning' }
    } else {
      return { text: 'Действует', class: 'status-active' }
    }
  }

  if (insurances.length === 0) {
    return (
      <div className="empty-list">
        <p>Страховки не найдены</p>
        <p className="empty-hint">Добавьте первую страховку, нажав кнопку "Добавить страховку"</p>
      </div>
    )
  }

  return (
    <div className="insurance-list">
      {insurances.map(insurance => {
        const statusInfo = getStatusInfo(insurance.end_date)
        return (
          <div key={insurance.id} className="insurance-card">
            <div className="insurance-header">
              <div className="insurance-title">
                <h3>🛡️ {insurance.insurance_type}</h3>
                <span className={`status-badge ${statusInfo.class}`}>
                  {statusInfo.text}
                </span>
              </div>
              <div className="insurance-actions">
                <button onClick={() => onEdit(insurance)} className="edit-btn">✏️</button>
                <button onClick={() => onDelete(insurance.id)} className="delete-btn">🗑️</button>
              </div>
            </div>

            <div className="insurance-info">
              <div className="info-row">
                <span className="info-label">Клиент:</span>
                <span className="info-value">{getClientName(insurance.client_id)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Страховая компания:</span>
                <span className="info-value">{insurance.insurance_company}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Период действия:</span>
                <span className="info-value">
                  {formatDateLong(insurance.start_date)} - {formatDateLong(insurance.end_date)}
                </span>
              </div>
              {insurance.policy_number && (
                <div className="info-row">
                  <span className="info-label">Номер полиса:</span>
                  <span className="info-value">{insurance.policy_number}</span>
                </div>
              )}
              {insurance.premium_amount && (
                <div className="info-row">
                  <span className="info-label">Страховая премия:</span>
                  <span className="info-value amount">{formatAmount(insurance.premium_amount)}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InsuranceList

