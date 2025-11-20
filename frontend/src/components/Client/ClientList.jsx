import React from 'react'
import ClientCard from './ClientCard'
import './ClientList.css'

const ClientList = ({ clients, deals, insurances, onEdit, onDelete }) => {
  const getDealsCount = (clientId) => {
    return deals.filter(d => d.client_id === clientId).length
  }

  const getInsurancesCount = (clientId) => {
    return insurances.filter(i => i.client_id === clientId).length
  }

  if (clients.length === 0) {
    return (
      <div className="empty-list">
        <p>Клиенты не найдены</p>
        <p className="empty-hint">Добавьте первого клиента, нажав кнопку "Добавить клиента"</p>
      </div>
    )
  }

  return (
    <div className="client-list">
      {clients.map(client => (
        <ClientCard
          key={client.id}
          client={client}
          onEdit={onEdit}
          onDelete={onDelete}
          dealsCount={getDealsCount(client.id)}
          insurancesCount={getInsurancesCount(client.id)}
        />
      ))}
    </div>
  )
}

export default ClientList

