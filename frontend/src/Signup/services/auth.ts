type SignupParam = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

export class AuthService {
  constructor(
    private urlEndpoint: string = import.meta.env.VITE_API_ENDPOINT
  ) { 
    console.log(import.meta.env);
    
  }

  async signup(data: SignupParam): Promise<void> {
    const url = `${this.urlEndpoint}/auth/signup`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      })
    })
    if (response.status >= 400) {
      throw new Error('Ocorreu um problema. Tente novamente mais tarde')
    }
  }
}