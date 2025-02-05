import styled from "styled-components"
import React, { useEffect } from "react"
import { BsCartCheckFill } from "react-icons/bs"
import { FaCartPlus } from "react-icons/fa6"

import { CartContext, CartContextType, CartItem } from "../../contexts/CartContext/CartContext"
import { MidiaService } from "../../services/midia-service"
import { Product } from "../../services/entities"
import { CartService } from "../../services/cart-service"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"

type Props = {
  product: Product
  readonly?: boolean | undefined
}

const priceReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const ProductCardItem = ({ product, readonly }: Props) => {

  const [imageSrc, setImageSrc] = React.useState('')
  const [addedCart, setAddedCart] = React.useState(false)

  const { addItemCart, existsProduct } = React.useContext(CartContext) as CartContextType
  const { accessToken } = React.useContext(AuthContext) as AuthContextType

  React.useEffect(() => {
    const productService = new MidiaService()
    const imageSrc: string = productService.getUrl(product.imageUrl)
    setImageSrc(imageSrc)
  }, [product.imageUrl])

  useEffect(() => {
    function verifyProductAddedToCart() {
      const addedCart = existsProduct(product)
      setAddedCart(addedCart)
    }
    verifyProductAddedToCart()
  }, [existsProduct, product])

  const addProductToCartOnClick = React.useCallback((product: Product) => {
    const cartService = new CartService(accessToken)
    cartService.addProductToCart(product)
      .then(() => {
        const cartItem = {
          createdAt: new Date(),
          product: product,
          quantity: 1,
        } as CartItem
        addItemCart(cartItem)
      })
  }, [addItemCart, accessToken])

  return (
    <Container $readonly={readonly} onClick={!addedCart && !readonly ? () => addProductToCartOnClick(product) : undefined}>
      <Image src={imageSrc} onError={() => setImageSrc('src/assets/imgs/no-image.jpg')} />
      <Info>
        <Titles>
          <Title>{product.name}</Title>
          <Subtitles>{product.description}</Subtitles>
        </Titles>
        <CardBottom>
          <PriceContainer>
            <PriceTitle>Preço</PriceTitle>
            <PriceValue>{priceReal.format(product.price)}</PriceValue>
          </PriceContainer>
          {!readonly && (
            <AddToCardButton $added={addedCart}>
              {addedCart ? <BsCartCheckFill /> : <FaCartPlus />}
            </AddToCardButton>

          )}
        </CardBottom>
      </Info>
    </Container>
  )
}

const Container = styled.div<{ $readonly?: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.colors.borderColor};
  outline: none;
  box-shadow: ${props => props.theme.shadows.card};
  transition: 500ms;

  ${props => !props.$readonly && `
    cursor: pointer;
    
    &:hover {
      transform: scale(1.10);
    }
  `}
`

const Image = styled.img`
  height: 185px; /* Tamanho fixo para a imagem */
  object-fit: cover; /* Para a imagem preencher a área sem distorção */
  border-top-left-radius: ${props => props.theme.borderRadius.default};
  border-top-right-radius: ${props => props.theme.borderRadius.default};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.sm};
  border-bottom-left-radius: ${props => props.theme.borderRadius.default};
  border-bottom-right-radius: ${props => props.theme.borderRadius.default};
  background-color: ${props => props.theme.colors.background};
  flex-grow: 1; /* Faz com que o Info ocupe o restante do espaço */
`

const Titles = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: auto; /* Para garantir que o conteúdo ocupe a área disponível antes do rodapé */
`

const Title = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textPrimary};
`

const Subtitles = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: calc(${props => props.theme.fontSizes.small} * 0.90);
  color: ${props => props.theme.colors.textPrimary};
`

const CardBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 70px;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PriceTitle = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
`

const PriceValue = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.small};
`

const AddToCardButton = styled.div<{ $added: boolean }>`
  display: flex;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid none;
  padding: 12px;
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};

  box-shadow: ${props => props.theme.shadows.button};

  svg {
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.buttonColorPrimary};
  }

  cursor: ${props => props.$added ? 'default' : 'pointer'};

  transition: 200ms;

  ${props =>
    !props.$added ?
      `
      &:hover {
        transform: scale(1.10);

        border: 1px solid ${props.theme.colors.buttonBackgroundPrimary};
        background-color: ${props.theme.colors.buttonColorPrimary};
        svg {
          color: ${props.theme.colors.buttonBackgroundPrimary};
        }
      }
      &:active {
        transform: scale(1.10);

        border: 1px solid ${props.theme.colors.buttonColorPrimary};
        background-color: ${props.theme.colors.buttonBackgroundPrimary};
        svg {
          color: ${props.theme.colors.buttonBackgroundPrimary};
        }
      }
  ` : `
      border: 1px solid ${props.theme.colors.buttonBackgroundPrimary};
      background-color: ${props.theme.colors.buttonColorPrimary};

      svg {
        color: ${props.theme.colors.buttonBackgroundPrimary};
      }
  `}
`

