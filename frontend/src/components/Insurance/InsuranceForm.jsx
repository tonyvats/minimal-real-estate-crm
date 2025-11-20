import React, { useState, useEffect } from 'react'
import './InsuranceForm.css'

const InsuranceForm = ({ insurance, clients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    client_id: '',
    insurance_type: 'недвижимость',
    insurance_company: 'ВСК',
    start_date: '',
    end_date: '',
    premium_amount: '',
    policy_number: ''
  })

  useEffect(() => {
    if (insurance) {
      setFormData({
        client_id: insurance.client_id || '',
        insurance_type: insurance.insurance_type || 'недвижимость',
        insurance_company: insurance.insurance_company || 'ВСК',
        start_date: insurance.start_date ? insurance.start_date.split('T')[0] : '',
        end_date: insurance.end_date ? insurance.end_date.split('T')[0] : '',
        premium_amount: insurance.premium_amount || '',
        policy_number: insurance.policy_number || ''
      })
    }
  }, [insurance])

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
    <form onSubmit={handleSubmit} className="insurance-form">
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
          <label>Тип страховки *</label>
          <select
            name="insurance_type"
            value={formData.insurance_type}
            onChange={handleChange}
            required
          >
            <option value="недвижимость">Недвижимость</option>
            <option value="жизнь">Жизнь</option>
            <option value="здоровье">Здоровье</option>
            <option value="другое">Другое</option>
          </select>
        </div>
        <div className="form-group">
          <label>Страховая компания *</label>
          <select
            name="insurance_company"
            value={formData.insurance_company}
            onChange={handleChange}
            required
          >
            <option value="ВСК">ВСК</option>
            <option value="Росгосстрах">Росгосстрах</option>
            <option value="Ингосстрах">Ингосстрах</option>
            <option value="АльфаСтрахование">АльфаСтрахование</option>
            <option value="СОГАЗ">СОГАЗ</option>
            <option value="другая">Другая</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Дата начала *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата окончания *</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Сумма страховой премии</label>
          <input
            type="number"
            name="premium_amount"
            value={formData.premium_amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        <div className="form-group">
          <label>Номер полиса</label>
          <input
            type="text"
            name="policy_number"
            value={formData.policy_number}
            onChange={handleChange}
            placeholder="Номер полиса"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">
          {insurance ? 'Сохранить изменения' : 'Добавить страховку'}
        </button>
        <button type="button" onClick={onCancel} className="secondary">
          Отмена
        </button>
      </div>
    </form>
  )
}

export default InsuranceForm

