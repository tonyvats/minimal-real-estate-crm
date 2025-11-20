import React from 'react'
import { formatDateLong } from '../../utils/dateUtils'
import './DealList.css'

const DealList = ({ deals, clients, onEdit, onDelete }) => {
  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return 'Неизвестный клиент'
    return `${client.last_name} ${client.first_name} ${client.middle_name}`
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'завершена':
        return 'status-completed'
      case 'отменена':
        return 'status-cancelled'
      default:
        return 'status-in-progress'
    }
  }

  if (deals.length === 0) {
    return (
      <div className="empty-list">
        <p>Сделки не найдены</p>
        <p className="empty-hint">Добавьте первую сделку, нажав кнопку "Добавить сделку"</p>
      </div>
    )
  }

  return (
    <div className="deal-list">
      {deals.map(deal => (
        <div key={deal.id} className="deal-card">
          <div className="deal-header">
            <div className="deal-title">
              <h3>{deal.deal_type === 'купля' ? '🛒 Купля' : '💰 Продажа'}</h3>
              <span className={`status-badge ${getStatusClass(deal.status)}`}>
                {deal.status}
              </span>
            </div>
            <div className="deal-actions">
              <button onClick={() => onEdit(deal)} className="edit-btn">✏️</button>
              <button onClick={() => onDelete(deal.id)} className="delete-btn">🗑️</button>
            </div>
          </div>

          <div className="deal-info">
            <div className="info-row">
              <span className="info-label">Клиент:</span>
              <span className="info-value">{getClientName(deal.client_id)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Дата:</span>
              <span className="info-value">{formatDateLong(deal.deal_date)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Сумма:</span>
              <span className="info-value amount">{formatAmount(deal.amount)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Адрес объекта:</span>
              <span className="info-value">{deal.property_address}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DealList

