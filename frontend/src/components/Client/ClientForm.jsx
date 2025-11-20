import React, { useState, useEffect } from 'react'
import './ClientForm.css'

const ClientForm = ({ client, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    birth_date: '',
    phone: '',
    email: '',
    address: ''
  })

  useEffect(() => {
    if (client) {
      setFormData({
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        middle_name: client.middle_name || '',
        birth_date: client.birth_date ? client.birth_date.split('T')[0] : '',
        phone: client.phone || '',
        email: client.email || '',
        address: client.address || ''
      })
    }
  }, [client])

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
    <form onSubmit={handleSubmit} className="client-form">
      <div className="form-row">
        <div className="form-group">
          <label>Фамилия *</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Имя *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Отчество</label>
          <input
            type="text"
            name="middle_name"
            value={formData.middle_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Дата рождения</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Телефон *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+7 (999) 123-45-67"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@mail.com"
        />
      </div>

      <div className="form-group">
        <label>Адрес</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          placeholder="Город, улица, дом, квартира"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">
          {client ? 'Сохранить изменения' : 'Добавить клиента'}
        </button>
        <button type="button" onClick={onCancel} className="secondary">
          Отмена
        </button>
      </div>
    </form>
  )
}

export default ClientForm

