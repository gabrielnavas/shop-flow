import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"
import { Page } from "../../components/ui/Page"
import { HeaderPage } from "../../components/layout/HeaderPage"
import { CartContext, CartContextType } from "../../contexts/CartContext/CartContext"
import { CardCartItem } from "./CardCartItem"
import { transformToMoney } from "../../utils/money-transform"
import { Button } from "../../components/ui/Button"

export const CartPage = () => {

  const { isAuthencated } = React.useContext(AuthContext) as AuthContextType
  const { cartItems, totalPrice } = React.useContext(CartContext) as CartContextType

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
        <CartListContainer>
          <CartList>
            {cartItems.map(item => (
              <CardCartItem cartItem={item} />
            ))}
          </CartList>
        </CartListContainer>
        <CartInfoCard>
          <CartInfo>
            <TotalItems>Total de {cartItems.length} {cartItems.length > 1 ? 'Produtos' : 'Produto'}</TotalItems>
            <TotalPrice>{transformToMoney(totalPrice.toFixed(2))}</TotalPrice>
          </CartInfo>
          <FinishOrderButton>Finalizar pedido</FinishOrderButton>
        </CartInfoCard>
      </Content>
    </Page>
  )
}

const Content = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: calc(${props => props.theme.spacing.lg} * 2);
  padding: calc(${props => props.theme.spacing.lg} * 2);
  position: relative;
`

const CartListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CartList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const CartInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  position: sticky;
  top: 100px;
  right: 0;
  border: 1px solid ${props => props.theme.colors.borderColor};
  padding:  ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.default};
`

const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const TotalItems = styled.div`
   font-weight: 400;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.1);
  color: ${props => props.theme.colors.textPrimary};
`
const TotalPrice = styled.div`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.4);
  color: ${props => props.theme.colors.textPrimary};
`

const FinishOrderButton = styled(Button)`
  height: 60px;
  width: 250px;
  font-size: ${props => props.theme.fontSizes.medium};
`