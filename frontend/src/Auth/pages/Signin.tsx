import React, { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import { HeaderPage } from "../../components/HeaderPage"
import { Card } from "../components/Card"
import { CardHeader } from "../components/CardHeader"
import { Form } from "../components/Form"
import { FormGroup } from "../components/FormGroup"
import { HeaderSubtitle } from "../components/HeaderSubtitle"
import { HeaderTitle } from "../components/HeaderTitle"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { Page } from "../components/Page"
import { Row } from "../components/Row"
import { Rows } from "../components/Rows"
import { FormError } from "../components/FormError"
import { SubmitButton } from "../components/SubmitButton"
import { MoreLinks } from "../components/MoreLinks"
import { LinkTitle } from "../components/LinkTitle"
import { LinkContainer } from "../components/LinkContainer"
import { EnterLink } from "../components/EnterLink"
import { GlobalErrors } from "../components/GlobalErrors"

import { AuthService } from "../services/auth"
import { routes } from "../../Routes"

import { validateEmail } from "../../validators/email"
import { AuthContext, AuthContextType } from "../../contexts/auth"


type Inputs = {
  email: string
  password: string
}

export const SigninPage = () => {
  const [globalError, setGlobalError] = React.useState<string>('')

  const { signin, isAuthencated } = useContext(AuthContext) as AuthContextType

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Shop Flow | Criar conta!"
  }, [])


  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const onSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
    try {
      const authService = new AuthService()
      const { accessToken } = await authService.signin(data)
      signin(accessToken)
      navigate(routes.home)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Ocorreu um problema.\nTente novamente mais tarde.')
      }

      handleScrollToTop()
    }
  }, [navigate, signin])

  if (isAuthencated) {
    navigate(routes.home)
  }

  return (
    <Page>
      <HeaderPage />
      {!!globalError && (
        <Row>
          <GlobalErrors>
            <FormError>{globalError}</FormError>
          </GlobalErrors>
        </Row>
      )}
      <Rows>
        <Row>
          <Card>
            <CardHeader>
              <HeaderTitle>Entrar na conta</HeaderTitle>
              <HeaderSubtitle>Entra com seu e-mail e senha</HeaderSubtitle>
            </CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>E-mail</Label>
                <Input
                  type="email"
                  autoComplete="on"
                  $error={!!errors.email}
                  {...register("email", {
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    validate: validateEmail,
                  })}
                />
                {errors.email && <FormError>{errors.email.message}</FormError>}
              </FormGroup>
              <FormGroup>
                <Label>Senha</Label>
                <Input
                  type="password"
                  autoComplete="new-password"
                  $error={!!errors.password}
                  {...register("password", {
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    minLength: {
                      message: 'Senha deve ter no mínimo 6 caracteres',
                      value: 6,
                    },
                    maxLength: {
                      message: 'Senha deve ter no máximo 100 caracteres',
                      value: 100,
                    },
                  })}
                />
                {errors.password && <FormError>{errors.password.message}</FormError>}
              </FormGroup>
              <SubmitButton type="submit">Entrar na conta!</SubmitButton>
            </Form>
          </Card>
        </Row>
        <Row>
          <MoreLinks>
            <LinkContainer>
              <LinkTitle>Ainda não tem uma conta?</LinkTitle>
              <EnterLink to='/sign-up'>Entrar</EnterLink>
            </LinkContainer>
          </MoreLinks>
        </Row>
      </Rows>
    </Page>
  )
}