// Временный API сервис для работы с LocalStorage
// В будущем здесь будет подключение к реальному backend API

export const api = {
  // Клиенты
  getClients: () => {
    const clients = localStorage.getItem('clients')
    return clients ? JSON.parse(clients) : []
  },

  saveClients: (clients) => {
    localStorage.setItem('clients', JSON.stringify(clients))
  },

  // Сделки
  getDeals: () => {
    const deals = localStorage.getItem('deals')
    return deals ? JSON.parse(deals) : []
  },

  saveDeals: (deals) => {
    localStorage.setItem('deals', JSON.stringify(deals))
  },

  // Страховки
  getInsurances: () => {
    const insurances = localStorage.getItem('insurances')
    return insurances ? JSON.parse(insurances) : []
  },

  saveInsurances: (insurances) => {
    localStorage.setItem('insurances', JSON.stringify(insurances))
  },

  // Напоминания
  getReminders: () => {
    const reminders = localStorage.getItem('reminders')
    return reminders ? JSON.parse(reminders) : []
  },

  saveReminders: (reminders) => {
    localStorage.setItem('reminders', JSON.stringify(reminders))
  },
}

