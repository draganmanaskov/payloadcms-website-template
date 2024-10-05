import { Order } from '@/payload-types'
import { FieldHook } from 'payload'

export const generateOrderNumber: FieldHook<Order> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    return generateOrderNumberHelper()
  }
  return value
}

const generateOrderNumberHelper = () => {
  const date = new Date()

  // Extract the current date and time
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // Generate a random 4-digit number to ensure uniqueness
  const randomPart = Math.floor(1000 + Math.random() * 9000)

  // Combine them into an order number
  const orderNumber = `${year}${month}${day}-${hours}${minutes}${seconds}-${randomPart}`

  return orderNumber
}
