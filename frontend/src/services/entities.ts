export type Product = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
  createdAt: Date
  updatedAt?: Date
  category: Category;
}

export type Category = {
  id: number
  name: string
}

export type User = {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatusName {
  PENDING = 'PENDING', // Pendente
  PROCESSING = 'PROCESSING', // Processando
  SHIPPED = 'SHIPPED', // Enviado
  DELIVERED = 'DELIVERED', // Entregue
  CANCELLED = 'CANCELLED', // Cancelado
  RETURNED = 'RETURNED', // Devolvido
  FAILED = 'FAILED', // Falha
  ON_HOLD = 'ON_HOLD', // Em Espera
}

export type OrderItem = {
  product: Product
  unitPrice: number
  totalPrice: number
  quantity: number
}

export type Order = {
  user: User
  totalPrice: number
  orderStatusName: OrderStatusName
  orderItems: OrderItem[]
  createdAt: Date
  updatedAt?: Date
}