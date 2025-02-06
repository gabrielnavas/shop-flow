import React, { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

import { HeaderPage } from "../../components/layout/HeaderPage"
import { PageCard } from "../../components/ui/PageCard"
import { CardHeader } from "../../components/ui/CardHeader"
import { Form } from "../../components/ui/Form"
import { FormGroup } from "../../components/ui/FormGroup"
import { HeaderSubtitle } from "../../components/ui/CardHeaderSubtitle"
import { HeaderTitle } from "../../components/ui/CardHeaderTitle"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Label"
import { Page } from "../../components/ui/Page"
import { Row } from "../../components/ui/Row"
import { Rows } from "../../components/ui/Rows"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { MoreLinks } from "../../components/ui/LinkList"
import { LinkItemTitle } from "../../components/ui/LinkItemTitle"
import { LinkItem } from "../../components/ui/LinkItem"
import { LinkCustom } from "../../components/ui/LinkCustom"
import { ErrorList } from "../../components/ui/ErrorList"

import { AuthService } from "../../services/auth-service"
import { routeNames } from "../../routes/routes-names"

import { formValidateEmail } from "../../utils/form-email-validate"
import { AiOutlineLoading } from "react-icons/ai"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { Button } from "../../components/ui/Button"


type Inputs = {
  email: string
  password: string
}

export const SigninPage = () => {
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { signin, isAuthenticated } = useContext(AuthContext) as AuthContextType

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Shop Flow | Criar conta!"
  }, [])



  const onSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    
    setIsLoading(true)

    try {
      const authService = new AuthService()
      const { accessToken } = await authService.signin(data)
      signin(accessToken)
      navigate(routeNames.home)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Ocorreu um problema.\nTente novamente mais tarde.')
      }

      handleScrollToTop()
    }
    finally {
      setIsLoading(false)
    }
  }, [navigate, signin])

  if (isAuthenticated) {
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
              <HeaderTitle>Entrar na conta</HeaderTitle>
              <HeaderSubtitle>Entre com seu e-mail e senha</HeaderSubtitle>
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
                    validate: formValidateEmail,
                  })}
                />
                {errors.email && <ErrorItem>{errors.email.message}</ErrorItem>}
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
                {errors.password && <ErrorItem>{errors.password.message}</ErrorItem>}
              </FormGroup>
              <Button type="submit" $variant="add">
                {isLoading ? (
                  <AiOutlineLoading />
                ) : (
                  <span>
                    Entrar na conta!
                  </span>
                )}
              </Button>
            </Form>
          </PageCard>
        </Row>
        <Row>
          <MoreLinks>
            <LinkItem>
              <LinkItemTitle>Ainda não tem uma conta?</LinkItemTitle>
              <LinkCustom to='/sign-up'>Criar uma!</LinkCustom>
            </LinkItem>
          </MoreLinks>
        </Row>
      </Rows>
    </Page>
  )
}