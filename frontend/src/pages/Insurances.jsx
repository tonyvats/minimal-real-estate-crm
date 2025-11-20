import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import InsuranceList from '../components/Insurance/InsuranceList'
import InsuranceForm from '../components/Insurance/InsuranceForm'
import Modal from '../components/common/Modal'
import './Insurances.css'

const Insurances = () => {
  const [insurances, setInsurances] = useLocalStorage('insurances', [])
  const [clients] = useLocalStorage('clients', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInsurance, setEditingInsurance] = useState(null)
  const [filter, setFilter] = useState('all')

  const handleAdd = () => {
    setEditingInsurance(null)
    setIsModalOpen(true)
  }

  const handleEdit = (insurance) => {
    setEditingInsurance(insurance)
    setIsModalOpen(true)
  }

  const handleSave = (formData) => {
    if (editingInsurance) {
      setInsurances(insurances.map(i => 
        i.id === editingInsurance.id 
          ? { ...i, ...formData, premium_amount: formData.premium_amount ? parseFloat(formData.premium_amount) : null, updated_at: new Date().toISOString() }
          : i
      ))
    } else {
      const newInsurance = {
        id: Date.now(),
        ...formData,
        premium_amount: formData.premium_amount ? parseFloat(formData.premium_amount) : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setInsurances([...insurances, newInsurance])
    }
    setIsModalOpen(false)
    setEditingInsurance(null)
  }

  const handleDelete = (insuranceId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту страховку?')) {
      setInsurances(insurances.filter(i => i.id !== insuranceId))
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingInsurance(null)
  }

  return (
    <div className="insurances-page">
      <div className="page-header">
        <h1>Страховки</h1>
        <button onClick={handleAdd} className="add-button">
          + Добавить страховку
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
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Действующие
          </button>
          <button
            className={filter === 'expiring' ? 'active' : ''}
            onClick={() => setFilter('expiring')}
          >
            Истекающие
          </button>
          <button
            className={filter === 'expired' ? 'active' : ''}
            onClick={() => setFilter('expired')}
          >
            Истекшие
          </button>
        </div>
      </div>

      <div className="insurances-count">
        Всего страховок: {insurances.length}
      </div>

      <InsuranceList
        insurances={insurances}
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingInsurance ? 'Редактировать страховку' : 'Добавить страховку'}
      >
        <InsuranceForm
          insurance={editingInsurance}
          clients={clients}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  )
}

export default Insurances

