import React from "react"
import styled from "styled-components"

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"
import { useNavigate } from "react-router"
import { Page } from "../../components/ui/Page"
import { HeaderPage } from "../../components/layout/HeaderPage"
import { CartContext, CartContextType } from "../../contexts/CartContext/CartContext"
import { CartItem } from "./CartItem"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"

export const CartPage = () => {

  const { isAuthencated } = React.useContext(AuthContext) as AuthContextType
  const { items, globalError } = React.useContext(CartContext) as CartContextType

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Shop flow | Carrinho"
  })

  if (!isAuthencated) {
    navigate(routeNames.home)
    return null
  }

  return (
    <Page>
      <HeaderPage />
      <Content>
        {!!globalError && (
          <ErrorList>
            <ErrorItem>{globalError}</ErrorItem>
          </ErrorList>
        )}
        <CartList>
          {items.map(item => (
            <CartItem productCart={item} />
          ))}
        </CartList>
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

const CartList = styled.ul``
