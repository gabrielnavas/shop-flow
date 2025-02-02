import { Category } from "./entities"

type BodyCategory = Category

export class CategoryService {
  constructor(
    private urlEndpoint: string = `${import.meta.env.VITE_API_ENDPOINT}/category`,
  ) { }

  async findCategories(): Promise<Category[]> {
    try {
      const response = await fetch(this.urlEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          content: 'application/json',
        }
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
      const categories = await response.json()
      return categories.map(this.mapBodyToCategory)
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw err
    }
  }

  private mapBodyToCategory(body: BodyCategory): Category {
    return {
      id: body.id,
      name: body.name
    }
  }
}