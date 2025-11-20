import React, { useState, useEffect } from 'react'
import './DealForm.css'

const DealForm = ({ deal, clients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    deal_type: 'купля',
    deal_date: '',
    amount: '',
    property_address: '',
    status: 'в процессе'
  })

  useEffect(() => {
    if (deal) {
      setFormData({
        client_id: deal.client_id || '',
        deal_type: deal.deal_type || 'купля',
        deal_date: deal.deal_date ? deal.deal_date.split('T')[0] : '',
        amount: deal.amount || '',
        property_address: deal.property_address || '',
        status: deal.status || 'в процессе'
      })
    }
  }, [deal])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="deal-form">
      <div className="form-group">
        <label>Клиент *</label>
        <select
          name="client_id"
          value={formData.client_id}
          onChange={handleChange}
          required
        >
          <option value="">Выберите клиента</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.last_name} {client.first_name} {client.middle_name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Тип сделки *</label>
          <select
            name="deal_type"
            value={formData.deal_type}
            onChange={handleChange}
            required
          >
            <option value="купля">Купля</option>
            <option value="продажа">Продажа</option>
          </select>
        </div>
        <div className="form-group">
          <label>Дата сделки *</label>
          <input
            type="date"
            name="deal_date"
            value={formData.deal_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Сумма сделки *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        <div className="form-group">
          <label>Статус</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="в процессе">В процессе</option>
            <option value="завершена">Завершена</option>
            <option value="отменена">Отменена</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Адрес объекта недвижимости *</label>
        <textarea
          name="property_address"
          value={formData.property_address}
          onChange={handleChange}
          rows="3"
          required
          placeholder="Город, улица, дом, квартира"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">
          {deal ? 'Сохранить изменения' : 'Добавить сделку'}
        </button>
        <button type="button" onClick={onCancel} className="secondary">
          Отмена
        </button>
      </div>
    </form>
  )
}

export default DealForm

