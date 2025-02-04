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
import { Modal } from "../../components/ui/Modal"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { MdCancel } from "react-icons/md"
import { ModalContent } from "./ModalContent"
import { ModalQuestion } from "./ModalQuestion"
import { ModalQuestionButtons } from "./ModalQuestionButtons"

type Props = {
  product: Product
}

// TODO: Limpar form quando cancelar ou dar o submit
// Remover errors global e todos os estados do componente
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
      removerProduct(product.id)
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
              {/* TODO: inverter botões de remove e cancelar */}
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
