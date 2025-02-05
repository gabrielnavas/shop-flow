import styled from "styled-components"
import { Button } from "../../components/ui/Button"
import { CartContext, CartContextType, CartItem } from "../../contexts/CartContext/CartContext"
import React from "react"

import { Modal } from "../../components/ui/Modal"
import { ModalContent } from "../../components/ui/ModalContent"
import { ModalQuestion } from "../../components/ui/ModalQuestion"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { ModalQuestionButtons } from "../../components/ui/ModalQuestionButtons"
import { ButtonIconContainer } from "../../components/ui/ButtonIconContainer"
import { MdCancel } from "react-icons/md"
import { BiTrash } from "react-icons/bi"

type Props = {
  cartItem: CartItem
}

export const RemoveItemButton = ({ cartItem }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const {
    removeItem,
    globalError,
    clearGlobalError,
    isLoading,
  } = React.useContext(CartContext) as CartContextType

  const onCloseModal = React.useCallback(() => {
    clearGlobalError()
    setIsModalOpen(false)
  }, [clearGlobalError])

  const cancelRemoveProductItemOnClick = React.useCallback(() => {
    onCloseModal()
  }, [onCloseModal])

  const removeItemOnClick = React.useCallback(() => {
    removeItem(cartItem.product.id)
    onCloseModal()
  }, [removeItem, onCloseModal, cartItem.product.id])


  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        Remover
      </Container>


      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <ModalContent>
          <ModalQuestion>Deseja realmente remover esse Produto do carrinho?</ModalQuestion>
          {!!globalError && (
            <ErrorList>
              <ErrorItem>{globalError}</ErrorItem>
            </ErrorList>
          )}
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <ModalQuestionButtons>
              {/* TODO: inverter botões de remove e cancelar */}
              <Button $variant="error" onClick={() => removeItemOnClick()}>
                <ButtonIconContainer>
                  <BiTrash />
                </ButtonIconContainer>
                Remover
              </Button>

              <Button $variant="cancel" onClick={() => cancelRemoveProductItemOnClick()}>
                <ButtonIconContainer>
                  <MdCancel />
                </ButtonIconContainer>
                Cancelar
              </Button>

            </ModalQuestionButtons>
          )}
        </ModalContent>
      </Modal>

    </>
  )
}

const Container = styled(Button)`
  background-color: ${props => props.theme.colors.buttonBackgroundError};

  &:hover {
    background-color: ${props => props.theme.colors.buttonBackgroundErrorHover};
  }
`