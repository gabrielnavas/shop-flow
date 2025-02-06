import styled from "styled-components"
import { OrderItem } from "../../services/entities"
import { midiaUrldefaults } from "../../services/midia-service"
import React from "react"
import { transformToMoney } from "../../utils/money-transform"

type Props = {
  orderItem: OrderItem
}

export const OrderItemComponent = ({ orderItem }: Props) => {

  const [imageUrl, setImageUrl] = React.useState<string>(orderItem.product.imageUrl)

  return (
    <Container>
      <ProductImage
        src={imageUrl}
        onError={() => setImageUrl(midiaUrldefaults.product)} />
      <ProductInfo>
        <ProductTitle>{orderItem.product.name}</ProductTitle>
        <ProductDescription>{orderItem.product.description}</ProductDescription>
        <ProductPriceContainer>
          <QuantityAndPriceContainer>
            <QuantityItem>{orderItem.quantity}</QuantityItem>
            <SymbolMultiply>x</SymbolMultiply>
            <PriceItem>{transformToMoney(orderItem.product.price.toString())}</PriceItem>
          </QuantityAndPriceContainer>
          <TotalPrice>{transformToMoney((orderItem.product.price * orderItem.quantity).toFixed(2))}</TotalPrice>
        </ProductPriceContainer>
      </ProductInfo>
    </Container>
  )
}

const Container = styled.li`
  display: flex;
  width: 100%;
  gap: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.colors.borderColor};
`

const ProductImage = styled.img`
  height: 185px; /* Tamanho fixo para a imagem */
  object-fit: cover; /* Para a imagem preencher a área sem distorção */
  border-top-left-radius: ${props => props.theme.borderRadius.default};
  border-bottom-left-radius: ${props => props.theme.borderRadius.default};
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.md};
`

const ProductTitle = styled.span`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.medium} * 1.1);
  color: ${props => props.theme.colors.textPrimary};
`

const ProductDescription = styled.span`
  font-weight: 300;
  font-size: calc(${props => props.theme.fontSizes.xs} * 1.05);
  color: ${props => props.theme.colors.textPrimary};
  flex-grow: 1;
`

const ProductPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const QuantityAndPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

const QuantityItem = styled.span`
  font-weight: 400;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.1);
  color: ${props => props.theme.colors.textPrimary};
`
const SymbolMultiply = styled.span`
  font-weight: 300;
  font-size: calc(${props => props.theme.fontSizes.large} * 0.6);
  color: ${props => props.theme.colors.textSecondary};
`
const PriceItem = styled.span`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.large} * 1.4);
  color: ${props => props.theme.colors.textPrimary};
`

const TotalPrice = styled.span`
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.textPrimary};
`