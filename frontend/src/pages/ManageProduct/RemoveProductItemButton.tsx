import React from "react"
import { ProductService } from "../../services/product-service"
import { Button } from "../../components/ui/Button"
import { ButtonIconContainer } from "./ButtonIconContainer"
import { BiTrash } from "react-icons/bi"
import { ProductContext, ProductContextType } from "../../contexts/ProductContext/ProductContext"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { Product } from "../../services/entities"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { ProductCardItem } from "../ProductCatalog/ProductCardItem"
import styled from "styled-components"
import { Modal } from "../../components/ui/Modal"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { MdCancel } from "react-icons/md"

type Props = {
  product: Product
}


export const RemoveProductItemButton = ({ product }: Props) => {
  const [globalError, setGlobalError] = React.useState('')
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { accessToken } = React.useContext(AuthContext) as AuthContextType
  const { removerProduct } = React.useContext(ProductContext) as ProductContextType

  const removeProductItemOnClick = React.useCallback(async () => {
    setIsLoading(true)

    try {
      const productService = new ProductService(accessToken)
      await productService.removeProduct(product)
      setIsModalOpen(false)
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Tente novamente mais tarde.')
      }
    } finally {
      setIsLoading(false)
    }
    removerProduct(product.id)
  }, [accessToken, product, removerProduct])

  const cancelRemoveProductItemOnClick = React.useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Button $variant="error" onClick={() => setIsModalOpen(true)}>
        <ButtonIconContainer>
          <BiTrash />
        </ButtonIconContainer>
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ProductCardItem product={product} readonly />
          <ModalQuestion>Deseja realmente remover esse Produto?</ModalQuestion>
          {!!globalError && (
            <ErrorList>
              <ErrorItem>{globalError}</ErrorItem>
            </ErrorList>
          )}
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <ModalQuestionButtons>

              <Button $variant="error" onClick={() => removeProductItemOnClick()}>
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
      </Modal >
    </>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.md};
`

const ModalQuestion = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
`

const ModalQuestionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs}
`