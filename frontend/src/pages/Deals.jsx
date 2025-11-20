import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import DealList from '../components/Deal/DealList'
import DealForm from '../components/Deal/DealForm'
import Modal from '../components/common/Modal'
import './Deals.css'

const Deals = () => {
  const [deals, setDeals] = useLocalStorage('deals', [])
  const [clients] = useLocalStorage('clients', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)
  const [filter, setFilter] = useState('all')

  const handleAdd = () => {
    setEditingDeal(null)
    setIsModalOpen(true)
  }

  const handleEdit = (deal) => {
    setEditingDeal(deal)
    setIsModalOpen(true)
  }

  const handleSave = (formData) => {
    if (editingDeal) {
      setDeals(deals.map(d => 
        d.id === editingDeal.id 
          ? { ...d, ...formData, updated_at: new Date().toISOString() }
          : d
      ))
    } else {
      const newDeal = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setDeals([...deals, newDeal])
    }
    setIsModalOpen(false)
    setEditingDeal(null)
  }

  const handleDelete = (dealId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      setDeals(deals.filter(d => d.id !== dealId))
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingDeal(null)
  }

  const filteredDeals = deals.filter(deal => {
    if (filter === 'all') return true
    if (filter === 'completed') return deal.status === 'завершена'
    if (filter === 'in-progress') return deal.status === 'в процессе'
    if (filter === 'cancelled') return deal.status === 'отменена'
    return true
  })

  const totalAmount = filteredDeals.reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0)

  return (
    <div className="deals-page">
      <div className="page-header">
        <h1>Сделки</h1>
        <button onClick={handleAdd} className="add-button">
          + Добавить сделку
        </button>
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
            className={filter === 'in-progress' ? 'active' : ''}
            onClick={() => setFilter('in-progress')}
          >
            В процессе
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Завершены
          </button>
          <button
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Отменены
          </button>
        </div>
        <div className="total-amount">
          Общая сумма: {new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
          }).format(totalAmount)}
        </div>
      </div>

      <div className="deals-count">
        Найдено сделок: {filteredDeals.length}
      </div>

      <DealList
        deals={filteredDeals}
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingDeal ? 'Редактировать сделку' : 'Добавить сделку'}
      >
        <DealForm
          deal={editingDeal}
          clients={clients}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  )
}

export default Deals

