import React from "react"
import styled from "styled-components"

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"
import { useNavigate } from "react-router"
import { Page } from "../../components/ui/Page"
import { HeaderPage } from "../../components/layout/HeaderPage"

export const CartPage = () => {

  const {isAuthencated} = React.useContext(AuthContext) as AuthContextType

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title="shop flow | Carrinho"
  })

  if(isAuthencated) {
    navigate(routeNames.home)
  }

  return (
   <Page>
    <HeaderPage />
    <Content>
      cart
    </Content>
  </Page>
  )
}


const Content = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`
