import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"

import { Controller, useForm } from 'react-hook-form'

import { useTheme } from "@/src/hooks/useTheme"
import { router } from "expo-router"
import { Input } from "@/src/components/ui/Input"
import { FormGroup } from "@/src/components/ui/FormGroup"
import { Label } from "@/src/components/ui/Label"
import { Button } from "@/src/components/ui/Button"
import { AuthService } from "@/src/services/auth-service"
import { formValidateEmail } from "@/src/utils/form-email-validate"
import { ErrorItem } from "@/src/components/ui/ErrorItem"
import { ErrorList } from "@/src/components/ui/ErrorList"

import LoadingIcon from "@/src/components/ui/LoadingIcon"
import { useAuth } from "@/src/hooks/useAuth"


type Inputs = {
  fullname: string
  email: string
  password: string
  passwordConfirmation: string
}

export default function SignUpScreen() {
  const { theme } = useTheme()

  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { isAuthenticated } = useAuth()

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  React.useEffect(() => {
    function goToHomeIfAuthenticated() {
      if (isAuthenticated === true) {
        router.replace('/home')
      }
    }
    goToHomeIfAuthenticated()
  }, [])

  const onSubmitOnClick = React.useCallback(async ({ email,
    fullname,
    password,
    passwordConfirmation
  }: Inputs) => {
    try {
      setIsLoading(true)
      const authService = new AuthService()
      await authService.signup({
        email,
        fullname,
        password,
        passwordConfirmation
      })
      router.replace({
        pathname: '/signin',
        params: { message: 'Entre com sua nova conta' }
      })
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Aconteceu algo. Tente novamente mais tarde.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const goToSignInOnPress = React.useCallback(() => {
    router.replace({
      pathname: '/signin',
    })
  }, [])

  return (
    <View style={[
      styles.container, {
        backgroundColor: theme.colors.cardBackground,
      }]}>
      <View style={styles.titleContainer}>
        <Title />
        <Subtitle />
      </View>
      <View style={styles.form}>
        <FormGroup>
          <Label>Nome completo</Label>
          <Controller
            control={control}
            name="fullname"
            rules={{
              required: {
                message: 'Esse Campo é requerido.',
                value: true,
              },
              maxLength: {
                message: 'Nome máximo de 100 caracteres.',
                value: 100,
              },
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                autoFocus={true}
                placeholder="John Woe"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
              />
            )}
          />
          {errors.fullname && <ErrorItem>{errors.fullname.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label>E-mail</Label>
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
                keyboardType='email-address'
                placeholder="john@email.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
              />
            )}
          />
          {errors.email && <ErrorItem>{errors.email.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label>Senha</Label>
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
                secureTextEntry={true}
                placeholder="********"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
              />
            )}
          />
          {errors.password && <ErrorItem>{errors.password.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label>Confirmação de senha</Label>
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
                secureTextEntry={true}
                placeholder="********"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!error}
              />
            )}
          />
          {errors.passwordConfirmation && <ErrorItem>{errors.passwordConfirmation.message}</ErrorItem>}
        </FormGroup>
        {globalError && (
          <ErrorList>
            <ErrorItem>{globalError}</ErrorItem>
          </ErrorList>
        )}
        <FormGroup style={{
          gap: 10,
          marginVertical: 20,
        }}>
          <Button
            title="Criar conta"
            onPress={handleSubmit(onSubmitOnClick)}
            icon={isLoading && <LoadingIcon />} />
          <Button
            variant="outlined"
            title="Já tenho uma conta"
            onPress={() => goToSignInOnPress()} />
        </FormGroup>
      </View>
    </View>
  )
}

const Title = () => {
  const { theme } = useTheme()
  return (
    <Text style={{
      fontSize: theme.fontSizes.extraLarge,
      fontWeight: 'bold'
    }}>
      Criar conta
    </Text>
  )
}

const Subtitle = () => {
  const { theme } = useTheme()
  return (
    <Text style={{
      fontSize: theme.fontSizes.small,
      fontWeight: '400'
    }}>
      Crie uma conta para continuar
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  titleContainer: {
    alignItems: 'center'
  },
  form: {
    alignItems: 'center',
    gap: 10,
  }
})
