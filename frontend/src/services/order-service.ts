import { Order, OrderStatusName } from "./entities";

type NewOrderItem = {
  quantity: number;
  unitPrice: number;
  productId: number;
};


type NewOrder = {
  orderItems: NewOrderItem[];
}

export class OrderService {

  constructor(
    private accessToken: string,
    private urlEndpoint: string = `${import.meta.env.VITE_API_ENDPOINT}/order`,
  ) { }

  async newOrder(newOrder: NewOrder) {
    try {
      const response = await fetch(this.urlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`
        },
        body: JSON.stringify(newOrder)
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  async findOrdersByLoggedUser(): Promise<Order[]> {
    try {
      const response = await fetch(this.urlEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`
        },
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
      const orders = await response.json()
      return orders
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw new Error('Tente novamente mais tarde.')
    }
  }

  static translate(orderStatusName: OrderStatusName, locale = 'ptBR') {
    if(locale === 'ptBR') {
      switch(orderStatusName) {
        case OrderStatusName.PENDING: return 'Pendente'
        case OrderStatusName.PROCESSING: return 'Processando'
        case OrderStatusName.SHIPPED: return 'Enviado'
        case OrderStatusName.DELIVERED: return 'Entregue'
        case OrderStatusName.CANCELLED: return 'Cancelado'
        case OrderStatusName.RETURNED: return 'Devolvido'
        case OrderStatusName.FAILED: return 'Falhou'
        case OrderStatusName.ON_HOLD: return 'Em Espera'
        default:
          throw new Error('order status not found')
      }
    }
    return orderStatusName
  }
}