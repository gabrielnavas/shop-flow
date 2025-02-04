import React from "react"
import styled from "styled-components"

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"
import { useNavigate } from "react-router"
import { Page } from "../../components/ui/Page"
import { HeaderPage } from "../../components/layout/HeaderPage"
import { CartContext, CartContextType } from "../../contexts/CartContext/CartContext"

export const CartPage = () => {

  const { isAuthencated } = React.useContext(AuthContext) as AuthContextType
  const { items } = React.useContext(CartContext) as CartContextType

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
        <CartList>
          {items.map(item => (
            <CartItem>{item.product.name}</CartItem>
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
const CartItem = styled.li``
