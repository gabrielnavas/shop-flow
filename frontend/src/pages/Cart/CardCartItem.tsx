import { BiMinus, BiPlus } from "react-icons/bi"
import styled from "styled-components"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { MidiaService, midiaUrldefaults } from "../../services/midia-service"
import React from "react"
import { transformToMoney } from "../../utils/money-transform"
import { CartContext, CartContextType, CartItem } from "../../contexts/CartContext/CartContext"

import { RemoveItemButton } from "./RemoveItemButton"

type Props = {
  cartItem: CartItem
}

export const CardCartItem = ({ cartItem }: Props) => {
  const [imageUrl, setImageUrl] = React.useState('')

  const {
    incrementQuantityItem,
    decrementQuantityItem,
  } = React.useContext(CartContext) as CartContextType

  React.useEffect(() => {
    const midiaService = new MidiaService()
    const imageUrl = midiaService.getUrl(cartItem.product.imageUrl)
    setImageUrl(imageUrl)
  }, [cartItem.product.imageUrl])

  return (
    <>
      <Container>
        <LeftSide>
          <ImageContainer>
            <Image
              src={imageUrl}
              onError={() => setImageUrl(midiaUrldefaults.product)} />
          </ImageContainer>
        </LeftSide>
        <Middle>
          <TopMiddle>
            <Name>
              {cartItem.product.name}
            </Name>
            <Description>
              {cartItem.product.description}
            </Description>
            <CreatedAt>
              <span>Adicionado ao carrinho em </span>
              {cartItem.createdAt.toString()}
            </CreatedAt>
          </TopMiddle>
          <BottomMiddle>
            <QuantityItemContainer>
              <DecrementButton onClick={() => decrementQuantityItem(cartItem.product.id, 1)}>
                <BiMinus />
              </DecrementButton>
              <CountItems onChange={() => { }} value={cartItem.quantity} />
              <IncrementItemButton onClick={() => incrementQuantityItem(cartItem.product.id, 1)}>
                <BiPlus />
              </IncrementItemButton>
            </QuantityItemContainer>
            <PipeSeparator />
            <RemoveItemButton cartItem={cartItem} />
          </BottomMiddle>
        </Middle>
        <RightSide>
          <QuantityPriceContainer>
            <QuantityItem>{cartItem.quantity}</QuantityItem>
            <SymbolMultiply>x</SymbolMultiply>
            <PriceItem>{transformToMoney(cartItem.product.price.toString())}</PriceItem>
          </QuantityPriceContainer>
          <TotalPriceContainer>
            {transformToMoney((cartItem.product.price * cartItem.quantity).toFixed(2))}
          </TotalPriceContainer>
        </RightSide>
      </Container>
    </>
  )
}
const Container = styled.li`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  width: 1000px;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.md};
`
const LeftSide = styled.div``

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 300px;
`
const ImageContainer = styled.div``
const Image = styled.img`
  height: 185px; /* Tamanho fixo para a imagem */
  object-fit: cover; /* Para a imagem preencher a área sem distorção */
  border-radius: ${props => props.theme.borderRadius.default};
  width: 300px;
`
const TopMiddle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Middle = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  gap: 5px;
`

const Name = styled.span`
  font-size: 500;
  font-size: ${props => props.theme.fontSizes.large};
`
const Description = styled.span`
  flex-grow: 1;
  font-size: 400;
  font-size: ${props => props.theme.fontSizes.medium};
`
const CreatedAt = styled.span`
  font-size: 300;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textPrimary};
  font-style: italic;
`
const BottomMiddle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  height: calc(${props => props.theme.spacing.lg} * 1.25);
`
const QuantityItemContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  width: 150px;
`

const DecrementButton = styled(Button)``
const CountItems = styled(Input)``
const IncrementItemButton = styled(Button)``


const QuantityPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

const QuantityItem = styled.span`
  font-weight: 400;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.3);
  color: ${props => props.theme.colors.textPrimary};
`
const SymbolMultiply = styled.span`
  font-weight: 300;
  font-size: calc(${props => props.theme.fontSizes.large} * 0.8);
  color: ${props => props.theme.colors.textSecondary};
`
const PriceItem = styled.span`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.6);
  color: ${props => props.theme.colors.textPrimary};
`

const TotalPriceContainer = styled.div`
  font-weight: bold;
  font-size: calc(${props => props.theme.fontSizes.large} * 2);
  color: ${props => props.theme.colors.textPrimary};
`

const PipeSeparator = styled.div`
  display: flex;
  justify-content: center;
  height: 85%;
  width: 1px;
  border-radius: ${props => props.theme.borderRadius.default};
  background-color: ${props => props.theme.colors.separatorColor};
`