import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ClientList from '../components/Client/ClientList'
import ClientForm from '../components/Client/ClientForm'
import Modal from '../components/common/Modal'
import './Clients.css'

const Clients = () => {
  const [clients, setClients] = useLocalStorage('clients', [])
  const [deals] = useLocalStorage('deals', [])
  const [insurances] = useLocalStorage('insurances', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAdd = () => {
    setEditingClient(null)
    setIsModalOpen(true)
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setIsModalOpen(true)
  }

  const handleSave = (formData) => {
    if (editingClient) {
      // Редактирование существующего клиента
      setClients(clients.map(c => 
        c.id === editingClient.id 
          ? { ...c, ...formData, updated_at: new Date().toISOString() }
          : c
      ))
    } else {
      // Добавление нового клиента
      const newClient = {
        id: Date.now(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      setClients([...clients, newClient])
    }
    setIsModalOpen(false)
    setEditingClient(null)
  }

  const handleDelete = (clientId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      setClients(clients.filter(c => c.id !== clientId))
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingClient(null)
  }

  const filteredClients = clients.filter(client => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    const fullName = `${client.last_name} ${client.first_name} ${client.middle_name}`.toLowerCase()
    const phone = (client.phone || '').toLowerCase()
    const email = (client.email || '').toLowerCase()
    return fullName.includes(query) || phone.includes(query) || email.includes(query)
  })

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>Клиенты</h1>
        <button onClick={handleAdd} className="add-button">
          + Добавить клиента
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск по имени, телефону или email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="clients-count">
        Найдено клиентов: {filteredClients.length}
      </div>

      <ClientList
        clients={filteredClients}
        deals={deals}
        insurances={insurances}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingClient ? 'Редактировать клиента' : 'Добавить клиента'}
      >
        <ClientForm
          client={editingClient}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  )
}

export default Clients

