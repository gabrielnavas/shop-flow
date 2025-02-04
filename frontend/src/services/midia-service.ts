export const midiaUrldefaults = {
  product: '/src/assets/imgs/no-image.jpg'
}

export class MidiaService {
  constructor(
    private urlEndpoint: string = `${import.meta.env.VITE_API_ENDPOINT}/midia`,
  ) {

  }

  getUrl(url: string): string {
    return `${this.urlEndpoint}?url=${url}`
  }

  async fetchImage(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao carregar a imagem");
    }

    return await response.blob();
  }
}