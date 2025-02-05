import { BiMinus, BiPlus } from "react-icons/bi"
import styled from "styled-components"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { MidiaService, midiaUrldefaults } from "../../services/midia-service"
import React from "react"
import { transformToMoney } from "../../utils/money-transform"
import { CartContext, CartContextType, CartItem } from "../../contexts/CartContext/CartContext"


import { Modal } from "../../components/ui/Modal"
import { ModalContent } from "../../components/ui/ModalContent"
import { ModalQuestion } from "../../components/ui/ModalQuestion"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { ModalQuestionButtons } from "../../components/ui/ModalQuestionButtons"
import { ButtonIconContainer } from "../../components/ui/ButtonIconContainer"
import { MdCancel } from "react-icons/md"
import { BiTrash } from "react-icons/bi"

import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { CartService } from "../../services/cart-service"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { distanceFrom } from "../../utils/date"


type Props = {
  cartItem: CartItem
}

export const CardCartItem = ({ cartItem }: Props) => {
  const [imageUrl, setImageUrl] = React.useState('')

  const [globalError, setGlobalError] = React.useState<string>('')

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = React.useState(false)
  const [modalError, setModalError] = React.useState<string>('')

  const { accessToken } = React.useContext(AuthContext) as AuthContextType

  const {
    incrementQuantityItem,
    decrementQuantityItem,
    removeItem,
  } = React.useContext(CartContext) as CartContextType

  React.useEffect(() => {
    const midiaService = new MidiaService()
    const imageUrl = midiaService.getUrl(cartItem.product.imageUrl)
    setImageUrl(imageUrl)
  }, [cartItem.product.imageUrl])

  const incrementQuantityItemOnClick = React.useCallback(() => {
    setGlobalError('')

    const cartService = new CartService(accessToken)
    const quantity = 1

    setIsLoading(true)
    cartService.incrementQuantityItem(cartItem.product.id, 1)
      .then(() => {
        incrementQuantityItem(cartItem.product.id, quantity)
      })
      .catch(err => {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [incrementQuantityItem, accessToken, cartItem.product.id])

  const decrementQuantityItemOnClick = React.useCallback(() => {
    setGlobalError('')

    const cartService = new CartService(accessToken)

    setIsLoading(true)

    const quantity = 1
    cartService.decrementQuantityItem(cartItem.product.id, 1)
      .then(() => {
        decrementQuantityItem(cartItem.product.id, quantity)
      })
      .catch(err => {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Ocorreu um problema. Tente decrementar mais tarde.')
        }
      }).finally(() => {
        setIsLoading(false)
      })
  }, [decrementQuantityItem, accessToken, cartItem.product.id])


  const removeCartItemOnClick = React.useCallback(() => {
    setGlobalError('')
    setModalError('')

    const cartService = new CartService(accessToken)
    setIsLoading(true)

    cartService.removeItem(cartItem.product.id)
      .then(() => {
        removeItem(cartItem.product.id)
        setIsRemoveItemModalOpen(false)
        setModalError('')
      })
      .catch(err => {
        if (err instanceof Error) {
          setModalError(err.message)
        } else {
          setModalError('Ocorreu um problema. Tente remover mais tarde.')
        }
      }).finally(() => {
        setIsLoading(false)
      })
  }, [cartItem.product.id, accessToken, removeItem])

  const cancelRemoveCartItemOnClick = React.useCallback(() => {
    setIsRemoveItemModalOpen(false)
    setGlobalError('')
  }, [])

  return (
    <>
      <Container>
        <CardContent>
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
                <span>Adicionado ao carrinho </span>
                {distanceFrom(cartItem.createdAt)}
              </CreatedAt>
            </TopMiddle>
            <BottomMiddle>
              <QuantityItemContainer>
                <DecrementButton onClick={() => decrementQuantityItemOnClick()}>
                  <BiMinus />
                </DecrementButton>
                <CountItems onChange={() => { }} value={cartItem.quantity} />
                <IncrementItemButton onClick={() => incrementQuantityItemOnClick()}>
                  <BiPlus />
                </IncrementItemButton>
              </QuantityItemContainer>
              <PipeSeparator />
              <RemoveItemButton onClick={() => setIsRemoveItemModalOpen(true)} >
                Remover
              </RemoveItemButton>
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
        </CardContent>

        {!!globalError && (
          <ErrorList>
            <ErrorItem>
              {globalError}
            </ErrorItem>
          </ErrorList>
        )}
      </Container>



      <Modal isOpen={isRemoveItemModalOpen} onClose={() => setIsRemoveItemModalOpen(false)}>
        <ModalContent>
          <ModalQuestion>Deseja realmente remover esse Produto do carrinho?</ModalQuestion>
          {!!modalError && (
            <ErrorList>
              <ErrorItem>{modalError}</ErrorItem>
            </ErrorList>
          )}
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <ModalQuestionButtons>
              <Button $variant="cancel" onClick={() => cancelRemoveCartItemOnClick()}>
                <ButtonIconContainer>
                  <MdCancel />
                </ButtonIconContainer>
                Cancelar
              </Button>
              <Button $variant="error" onClick={() => removeCartItemOnClick()}>
                <ButtonIconContainer>
                  <BiTrash />
                </ButtonIconContainer>
                Remover
              </Button>
            </ModalQuestionButtons>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  width: 1000px;
  border: 1px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.md};
`

const CardContent = styled.div`
  display: flex;
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

const RemoveItemButton = styled(Button)`
  background-color: ${props => props.theme.colors.buttonBackgroundError};

  &:hover {
    background-color: ${props => props.theme.colors.buttonBackgroundErrorHover};
  }
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