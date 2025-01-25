import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import styled from "styled-components"
import { HeaderPage } from "../../components/HeaderPage"
import { SubmitHandler, useForm } from "react-hook-form"
import { validateEmail } from "../../validators/email"
import { AuthService } from "../services/auth"
import { routes } from "../../Routes"

type Inputs = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

export const SignupPage = () => {

  const [globalError, setGlobalError] = useState<string>('')

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
    }
  }, [navigate])

  return (
    <Page>
      <HeaderPage />
      <Lines>
        {!!globalError && (
          <Line>
            <GlobalErrors>
              <FormError>{globalError}</FormError>
            </GlobalErrors>
          </Line>
        )}
        <Line>
          <Card>
            <Header>
              <HeaderTitle>Criar conta</HeaderTitle>
              <HeaderSubtitle>Crie um conta para continuar</HeaderSubtitle>
            </Header>
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
              <SignUpButton type="submit">Criar conta!</SignUpButton>
            </Form>
          </Card>
        </Line>
        <Line>
          <MoreLinks>
            <LinkContainer>
              <LinkTitle>Já tem uma conta?</LinkTitle>
              <Enter to='/sign-in'>Entrar</Enter>
            </LinkContainer>
          </MoreLinks>
        </Line>
      </Lines>
    </Page>
  )
}

const Page = styled.div`
  height: 100vh;
`

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: calc(${props => props.theme.spacing.lg} * 3);
`

const Line = styled.div`
  width: 400px;
`

const GlobalErrors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #FF828051;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.lg};
`

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.borderColor};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
`

const HeaderTitle = styled.span`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.extraLarge} * 1.45);
`

const HeaderSubtitle = styled.span`
  font-weight: 400;
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.small};
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const FormError = styled.span`
  color: ${props => props.theme.colors.error};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
`

const Label = styled.label`
  color: ${props => props.theme.colors.textPrimary};
`

const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textPrimary};
  border-radius: ${props => props.theme.borderRadius.default};
  outline: none;
  border: 1px solid ${props => props.theme.colors.borderColor};

  &:hover,&:focus {
    border: 1px solid ${props => props.$error ? props.theme.colors.error : props.theme.colors.borderColorHoverActive};
  }
`

const SignUpButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.buttonColorPrimary};
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
  border-radius: ${props => props.theme.borderRadius.default};

  &:hover {
    background-color: ${props => props.theme.colors.buttonBackgroundHover};
  }
`

const MoreLinks = styled.div`
  display: flex;
`

const LinkContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;

  color: ${props => props.theme.colors.textPrimary};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.medium};
`

const LinkTitle = styled.span`
`

const Enter = styled(Link)`
  color: ${props => props.theme.colors.link};
`
