import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

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
import { ErrorItem } from "../../components/ui/ErrorItem"
import { LinkList } from "../../components/ui/LinkList"
import { LinkItem } from "../../components/ui/LinkItem"
import { LinkItemTitle } from "../../components/ui/LinkItemTitle"
import { ErrorList } from "../../components/ui/ErrorList"

import { formValidateEmail } from "../../utils/form-email-validate"
import { AuthService } from "../../services/auth-service"
import { routeNames } from "../../routes/routes-names"
import { AiOutlineLoading } from "react-icons/ai"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { Button } from "../../components/ui/Button"
import { RequiredInput } from "../../components/ui/RequiredInput"

type Inputs = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

export const SignupPage = () => {

  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { isAuthenticated } = useContext(AuthContext) as AuthContextType

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<Inputs>({
    shouldFocusError: true,
    values: {
      email: '',
      fullname: '',
      password: '',
      passwordConfirmation: ''
    }
  })

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


  if (isAuthenticated) {
    navigate(routeNames.home)
  }

  console.log(touchedFields);


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
                <Label>Nome completo <RequiredInput /></Label>
                <Controller
                  control={control}
                  name="fullname"
                  rules={{
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    maxLength: {
                      message: 'Nome máximo de 100 caracteres.',
                      value: 100,
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      autoComplete="on"
                      type='text'
                      placeholder="john@email.com"
                      value={value}
                      $error={!!error}
                      onChange={onChange}
                      onBlur={() => {
                        onBlur()
                        if (value.length === 0) {
                          control.setError('fullname', { type: 'validate', message: 'Esse Campo é requerido.' })
                        }
                      }}
                    />
                  )}
                />
                {touchedFields.fullname && errors.fullname && <ErrorItem>{errors.fullname.message}</ErrorItem>}
              </FormGroup>
              <FormGroup>
                <Label>E-mail <RequiredInput /></Label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: {
                      message: 'Esse Campo é requerido.',
                      value: true
                    },
                    validate: formValidateEmail,
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      type='email'
                      placeholder="john@email.com"
                      value={value}
                      $error={!!error}
                      onChange={onChange}
                      onBlur={() => {
                        onBlur()
                        const errorMessage = formValidateEmail(value)
                        if (typeof errorMessage === 'string') {
                          control.setError('email', { type: 'validate', message: errorMessage })
                        }
                      }}
                    />
                  )}
                />
                {touchedFields.email && errors.email && <ErrorItem>{errors.email.message}</ErrorItem>}
              </FormGroup>
              <FormGroup>
                <Label>Senha <RequiredInput /></Label>
                <Controller
                  control={control}
                  name="password"
                  rules={{
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
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="******"
                      $error={!!error}
                      value={value}
                      onChange={onChange}
                      onBlur={() => {
                        onBlur()
                        if (value.length < 6) {
                          control.setError('password', {
                            type: 'minLength',
                            message: 'Senha deve ter no mínimo 6 caracteres',
                          })
                        }
                      }}
                    />
                  )}
                />
                {touchedFields.password && errors.password && <ErrorItem>{errors.password.message}</ErrorItem>}
              </FormGroup>
              <FormGroup>
                <Label>Confirmação de senha <RequiredInput /></Label>
                <Controller
                  control={control}
                  name="passwordConfirmation"
                  rules={{
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
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      type="password"
                      autoComplete="new-password"
                      placeholder="******"
                      $error={!!error}
                      value={value}
                      onChange={onChange}
                      onBlur={() => {
                        onBlur()
                        if (value.length < 6) {
                          control.setError('passwordConfirmation', {
                            type: 'minLength',
                            message: 'Senha deve ter no mínimo 6 caracteres',
                          })
                        }
                      }}
                    />
                  )}
                />
                {touchedFields.passwordConfirmation && errors.passwordConfirmation && <ErrorItem>{errors.passwordConfirmation.message}</ErrorItem>}
              </FormGroup>
              <Button type="submit" $variant="add">
                {isLoading ? (
                  <AiOutlineLoading />
                ) : (
                  <span>
                    Criar conta!
                  </span>
                )}
              </Button>
            </Form>
          </PageCard>
        </Row>
        <Row>
          <LinkList>
            <LinkItem>
              <LinkItemTitle>Já tem uma conta?</LinkItemTitle>
              <Button
                $variant="link"
                type="button"
                onClick={e => {
                  e.preventDefault()
                  navigate(routeNames.signin)
                }}>
                Entrar!
              </Button>
            </LinkItem>
          </LinkList>
        </Row>
      </Rows>
    </Page>
  )
}
