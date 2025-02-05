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
}