import { format, parse, differenceInDays, isToday, isPast, addDays } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (date, formatStr = 'dd.MM.yyyy') => {
  if (!date) return ''
  try {
    return format(new Date(date), formatStr, { locale: ru })
  } catch (error) {
    return ''
  }
}

export const formatDateLong = (date) => {
  return formatDate(date, 'dd MMMM yyyy')
}

export const parseDate = (dateString) => {
  if (!dateString) return null
  try {
    return parse(dateString, 'yyyy-MM-dd', new Date())
  } catch (error) {
    return null
  }
}

export const daysUntil = (date) => {
  if (!date) return null
  const targetDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)
  return differenceInDays(targetDate, today)
}

export const isDateToday = (date) => {
  if (!date) return false
  return isToday(new Date(date))
}

export const isDatePast = (date) => {
  if (!date) return false
  return isPast(new Date(date))
}

export const getNextBirthday = (birthDate) => {
  if (!birthDate) return null
  const today = new Date()
  const birth = new Date(birthDate)
  const thisYearBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
  
  if (thisYearBirthday < today) {
    return new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate())
  }
  
  return thisYearBirthday
}

