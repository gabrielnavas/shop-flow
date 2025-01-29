import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { SubmitHandler, useForm } from "react-hook-form"

import { HeaderPage } from "../../components/HeaderPage"
import { Page } from "../components/Page"
import { Rows } from "../components/Rows"
import { Row } from "../components/Row"
import { Card } from "../components/Card"
import { CardHeader } from "../components/CardHeader"
import { HeaderTitle } from "../components/HeaderTitle"
import { HeaderSubtitle } from "../components/HeaderSubtitle"
import { Form } from "../components/Form"
import { FormGroup } from "../components/FormGroup"
import { Label } from "../components/Label"
import { Input } from "../components/Input"
import { SubmitButton } from "../components/SubmitButton"
import { FormError } from "../components/FormError"
import { MoreLinks } from "../components/MoreLinks"
import { LinkContainer } from "../components/LinkContainer"
import { EnterLink } from "../components/EnterLink"
import { LinkTitle } from "../components/LinkTitle"
import { GlobalErrors } from "../../components/GlobalErrors"

import { validateEmail } from "../../validators/email"
import { AuthService } from "../services/auth-service"
import { routes } from "../../Routes"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { AiOutlineLoading } from "react-icons/ai"

type Inputs = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

export const SignupPage = () => {

  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { isAuthencated } = useContext(AuthContext) as AuthContextType

  const {
    register,
    handleSubmit,
    watch,
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
    setIsLoading(true)

    try {
      const authService = new AuthService()
      await authService.signup(data)
      navigate(routes.signin)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Ocorreu um problema.\nTente novamente mais tarde.')
      }
      handleScrollToTop()
    } finally {
      setIsLoading(false)
    }
  }, [navigate])


  if (isAuthencated) {
    navigate(routes.home)
  }


  return (
    <Page>
      <HeaderPage />
      <Rows>
        {!!globalError && (
          <Row>
            <GlobalErrors>
              <FormError>{globalError}</FormError>
            </GlobalErrors>
          </Row>
        )}
        <Row>
          <Card>
            <CardHeader>
              <HeaderTitle>Criar conta</HeaderTitle>
              <HeaderSubtitle>Crie um conta para continuar</HeaderSubtitle>
            </CardHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label>Nome completo</Label>
                <Input
                  type="text"
                  autoComplete="on"
                  {...register("fullname", {
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    maxLength: {
                      message: 'Nome máximo de 100 caracteres.',
                      value: 100,
                    },
                  })}
                  $error={!!errors.fullname}
                />
                {errors.fullname && <FormError>{errors.fullname.message}</FormError>}
              </FormGroup>
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
                    validate: (value) => {
                      if (value === watch('passwordConfirmation')) {
                        return true
                      }
                      return 'Senha está diferente da confirmação de senha.'
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
              <FormGroup>
                <Label>Confirmação de senha</Label>
                <Input
                  type="password"
                  autoComplete="new-password"
                  $error={!!errors.passwordConfirmation}
                  {...register("passwordConfirmation", {
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    validate: (value) => {
                      if (value === watch('password')) {
                        return true
                      }
                      return 'Confirmação de senha está diferente da senha.'
                    },
                    minLength: {
                      message: 'Confirmação de senha deve ter no mínimo 6 caracteres',
                      value: 6,
                    },
                    maxLength: {
                      message: 'Confirmação de senha deve ter no máximo 100 caracteres',
                      value: 100,
                    },
                  })}
                />
                {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}
              </FormGroup>
              <SubmitButton type="submit" $isLoading={isLoading}>
                {isLoading ? (
                  <AiOutlineLoading />
                ) : (
                  <span>
                    Criar conta!
                  </span>
                )}
              </SubmitButton>
            </Form>
          </Card>
        </Row>
        <Row>
          <MoreLinks>
            <LinkContainer>
              <LinkTitle>Já tem uma conta?</LinkTitle>
              <EnterLink to='/sign-in'>Entrar</EnterLink>
            </LinkContainer>
          </MoreLinks>
        </Row>
      </Rows>
    </Page>
  )
}
