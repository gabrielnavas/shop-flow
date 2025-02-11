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
import { OrderService } from "../../services/order-service"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { ImSad } from "react-icons/im"

export const CartPage = () => {

  const { isAuthenticated, accessToken } = React.useContext(AuthContext) as AuthContextType
  const { clearCart, cartItems, totalPrice } = React.useContext(CartContext) as CartContextType

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [globalError, setGlobalError] = React.useState<string>('')

  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Shop flow | Carrinho"
  })

  const onFinishOnClick = React.useCallback(() => {
    const orderService = new OrderService(accessToken)

    setIsLoading(true)
    const newOrder = {
      orderItems: cartItems.map(cartItem => ({
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        unitPrice: cartItem.product.price,
      }))
    }
    orderService.newOrder(newOrder).then(() => {
      navigate(routeNames.orders)
      clearCart()
    }).catch((err) => {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde')
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }, [navigate, cartItems, accessToken, clearCart])

  if (!isAuthenticated) {
    navigate(routeNames.home)
    return null
  }

  const emptyList = (
    <EmptyListCard>
      <EmptyListMessage>
        Nenhum item adicionado no carrinho.
      </EmptyListMessage>
      <EmptyListIcon>
        <ImSad />
      </EmptyListIcon>
      <Button $variant="link" onClick={e => {
        e.preventDefault()
        navigate(routeNames.home)
      }}>
        Ir para o catálogo
      </Button>
    </EmptyListCard>
  )

  return (
    <Page>
      <HeaderPage />
      <Content>
        <CartListContainer>
          {cartItems.length === 0 ? (
            emptyList
          ) : (
            <CartList>
              {cartItems.map(item => (
                <CardCartItem cartItem={item} />
              ))}
            </CartList>
          )}
        </CartListContainer>
        <CartInfoCard>
          {globalError && (
            <ErrorList>
              <ErrorItem>
                {globalError}
              </ErrorItem>
            </ErrorList>
          )}
          <CartInfo>
            <TotalItems>Total de {cartItems.length} {cartItems.length > 1 ? 'Produtos' : 'Produto'}</TotalItems>
            <TotalPrice>{transformToMoney(totalPrice.toFixed(2))}</TotalPrice>
          </CartInfo>
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <FinishOrderButton onClick={() => onFinishOnClick()} disabled={isLoading}>
              Finalizar pedido
            </FinishOrderButton>
          )}
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
  align-items: center;
  justify-content: space-between;
  width: 320px;
  height: 300px;
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

const EmptyListCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: 500px;
  gap: ${props => props.theme.spacing.lg};

  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.lg};
`

const EmptyListMessage = styled.span`
  display: flex;

  font-weight: bold;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.25);
`

const EmptyListIcon = styled.div`
  display: flex;
  svg {
    font-size: calc(${props => props.theme.fontSizes.large} * 5);
    color: ${props => props.theme.colors.darkIcon};
  }
`
