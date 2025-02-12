import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Controller, useForm } from 'react-hook-form'

import { router } from "expo-router"
import { useLocalSearchParams } from 'expo-router'

import { useTheme } from "@/src/hooks/useTheme"
import { Input } from "@/src/components/ui/Input"
import { FormGroup } from "@/src/components/ui/FormGroup"
import { Label } from "@/src/components/ui/Label"
import { Button } from "@/src/components/ui/Button"
import { AuthService } from "@/src/services/auth-service"
import { formValidateEmail } from "@/src/utils/form-email-validate"
import { ErrorItem } from "@/src/components/ui/ErrorItem"
import { ErrorList } from "@/src/components/ui/ErrorList"

import LoadingIcon from "@/src/components/ui/LoadingIcon"
import { MessageList } from "@/src/components/ui/MessageList"
import { MessageItem } from "@/src/components/ui/MessageItem"

import { useAuth } from "@/src/hooks/useAuth"


type Inputs = {
  email: string
  password: string
}

export default function SignInScreen() {
  const { theme } = useTheme()

  const { message } = useLocalSearchParams<{ message: string }>()

  const [globalMessage, setGlobalMessage] = React.useState<string>()
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const { signin } = useAuth()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  React.useEffect(() => {
    function setGlobalMessageFromOtherScreen() {
      setGlobalMessage(message)
    }
    setGlobalMessageFromOtherScreen()
  }, [])

  React.useEffect(() => {
    if (!!globalError) {
      setGlobalMessage('')
    }
    if (!!globalMessage) {
      setGlobalError('')
    }
  }, [globalError, globalMessage])

  const onSubmitOnClick = React.useCallback(async ({ email,
    password,
  }: Inputs) => {
    try {
      setIsLoading(true)
      const authService = new AuthService()
      const { accessToken } = await authService.signin({
        email,
        password,
      })
      await signin(accessToken)
      router.replace('/(drawer)/(tabs)/products')
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

  const goToSignUpOnPress = React.useCallback(() => {
    router.replace('/signup')
  }, [])

  return (
    <View style={[
      styles.container, {
        backgroundColor: theme.colors.cardBackground,
      }]}>
      {!!globalMessage && (
        <MessageList>
          <MessageItem>{globalMessage}</MessageItem>
        </MessageList>
      )}
      <View style={styles.titleContainer}>
        <Title />
        <Subtitle />
      </View>
      <View style={styles.form}>
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
                autoFocus={true}
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
        {!!globalError && (
          <ErrorList>
            <ErrorItem>{globalError}</ErrorItem>
          </ErrorList>
        )}
        <FormGroup style={{
          gap: 10,
          marginVertical: 20,
        }}>
          <Button
            style={styles.buttons}
            title="Entrar"
            onPress={handleSubmit(onSubmitOnClick)}
            icon={isLoading && <LoadingIcon />} />
          <Button
            style={styles.buttons}
            variant="outlined"
            title="Criar uma conta"
            onPress={() => goToSignUpOnPress()} />
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
      Entre com sua conta
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
      Entre com as credenciais da sua conta
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
  },
  buttons: {
    paddingHorizontal: 40,
    paddingVertical: 12,
  }
})
