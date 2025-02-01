export class MidiaService {
  constructor(
    private urlEndpoint: string = `${import.meta.env.VITE_API_ENDPOINT}/midia`,
  ) {

  }
  getUrl(url: string): string {
    return `${this.urlEndpoint}?url=${url}`
  }
}