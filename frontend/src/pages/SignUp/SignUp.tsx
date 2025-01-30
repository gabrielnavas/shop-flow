import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { SubmitHandler, useForm } from "react-hook-form"

import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import { Rows } from "../../components/ui/Rows"
import { Row } from "../../components/ui/Row"
import { PageCard } from "../../components/ui/PageCard"
import { CardHeader } from "../../components/ui/CardHeader"
import { HeaderTitle } from "../../components/ui/CardHeaderTitle"
import { HeaderSubtitle } from "../../components/ui/CardHeaderSubtitle"
import { Form } from "../../components/ui/Form"
import { FormGroup } from "../../components/ui/FormGroup"
import { Label } from "../../components/ui/Label"
import { Input } from "../../components/ui/Input"
import { FormButtonSubmit } from "../../components/ui/FormButtonSubmit"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { MoreLinks } from "../../components/ui/LinkList"
import { LinkItem } from "../../components/ui/LinkItem"
import { LinkCustom } from "../../components/ui/LinkCustom"
import { LinkItemTitle } from "../../components/ui/LinkItemTitle"
import { ErrorList } from "../../components/ui/ErrorList"

import { validateEmail } from "../../utils/email-validate"
import { AuthService } from "../../services/auth-service"
import { routeNames } from "../../routes/routes-names"
import { AiOutlineLoading } from "react-icons/ai"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"

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
      navigate(routeNames.signin)
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
    navigate(routeNames.home)
  }


  return (
    <Page>
      <HeaderPage />
      <Rows>
        {!!globalError && (
          <Row>
            <ErrorList>
              <ErrorItem>{globalError}</ErrorItem>
            </ErrorList>
          </Row>
        )}
        <Row>
          <PageCard>
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
                {errors.fullname && <ErrorList>{errors.fullname.message}</ErrorList>}
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
                {errors.email && <ErrorList>{errors.email.message}</ErrorList>}
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
                {errors.password && <ErrorList>{errors.password.message}</ErrorList>}
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
                {errors.passwordConfirmation && <ErrorList>{errors.passwordConfirmation.message}</ErrorList>}
              </FormGroup>
              <FormButtonSubmit type="submit" $isLoading={isLoading}>
                {isLoading ? (
                  <AiOutlineLoading />
                ) : (
                  <span>
                    Criar conta!
                  </span>
                )}
              </FormButtonSubmit>
            </Form>
          </PageCard>
        </Row>
        <Row>
          <MoreLinks>
            <LinkItem>
              <LinkItemTitle>Já tem uma conta?</LinkItemTitle>
              <LinkCustom to='/sign-in'>Entrar</LinkCustom>
            </LinkItem>
          </MoreLinks>
        </Row>
      </Rows>
    </Page>
  )
}
