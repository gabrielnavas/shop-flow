type SignupParam = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

type SigninParam = {
  email: string
  password: string
}

export class AuthService {
  constructor(
    private urlEndpoint: string = import.meta.env.VITE_API_ENDPOINT
  ) { }

  async signup(data: SignupParam): Promise<void> {
    const url = `${this.urlEndpoint}/auth/signup`
    const payload = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw err
    }
  }


  async signin(data: SigninParam): Promise<{ accessToken: string }> {
    const url = `${this.urlEndpoint}/auth/signin`
    const payload = {
      email: data.email,
      password: data.password,
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (response.status >= 400) {
        const { message } = await response.json()
        throw new Error(message)
      }

      const { accessToken } = await response.json()
      if (!accessToken) {
        throw new Error('Tente novamente mais tarde')
      }
      return {
        accessToken: accessToken
      }
    } catch (err) {
      if ((err as Error).name === 'TypeError' && (err as Error).message === 'Failed to fetch') {
        throw new Error('Servidor offline.')
      }

      throw err
    }
  }
}