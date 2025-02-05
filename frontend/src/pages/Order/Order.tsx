import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"

import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"

export const OrderPage = () => {

  const { isAuthencated } = React.useContext(AuthContext) as AuthContextType

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = 'Shop flow | Pedidos'
  }, [])

  if (!isAuthencated) {
    navigate(routeNames.home)
  }

  return (
    <Page>
      <HeaderPage />
      <Content>
        orders
      </Content>
    </Page>
  )
}

const Content = styled.div``