import React from "react"
import styled from "styled-components"

import { BiTrash } from "react-icons/bi"
import { MdCancel } from "react-icons/md"

import { ProductService } from "../../services/product-service"
import { Button } from "../../components/ui/Button"
import { ButtonIconContainer } from "./ButtonIconContainer"
import { ProductContext, ProductContextType } from "../../contexts/ProductContext/ProductContext"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { Product } from "../../services/entities"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { Modal } from "../../components/ui/Modal"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { ModalContent } from "./ModalContent"
import { ModalQuestion } from "./ModalQuestion"
import { ModalQuestionButtons } from "./ModalQuestionButtons"

type Props = {
  products: Product[]
}


export const RemoveProductItemsButton = ({ products }: Props) => {
  const [globalError, setGlobalError] = React.useState('')
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const { accessToken } = React.useContext(AuthContext) as AuthContextType
  const { removerProducts } = React.useContext(ProductContext) as ProductContextType

  const removeProductItemOnClick = React.useCallback(async () => {
    setIsLoading(true)

    try {
      const productService = new ProductService(accessToken)
      await productService.removeProducts(products)
      removerProducts(products.map(product => product.id))
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
  }, [accessToken, products, removerProducts])

  const cancelRemoveProductItemOnClick = React.useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Button $variant="error" onClick={() => setIsModalOpen(true)} disabled={products.length === 0}>
        <ButtonIconContainer>
          <BiTrash />
        </ButtonIconContainer>
        Remover selecionados
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalQuestion>Deseja realmente remover os Produtos selecionados?</ModalQuestion>

          <ProductList>
            <>
              <ProductItem>
                <ProductItemHeader $width="100px">
                  Nome
                </ProductItemHeader>
                <ProductItemHeader $width="100px">
                  Descrição
                </ProductItemHeader>
                <ProductItemHeader $width="100px">
                  Estoque
                </ProductItemHeader>
                <ProductItemHeader $width="100px">
                  Preço
                </ProductItemHeader>
              </ProductItem>
            </>
            {
              products.map(product => (
                <ProductItem key={product.id}>
                  <ProductItemData $width="100px">
                    {product.name}
                  </ProductItemData>
                  <ProductItemData $width="100px">
                    {product.description}
                  </ProductItemData>
                  <ProductItemData $width="100px">
                    {product.stock}
                  </ProductItemData>
                  <ProductItemData $width="100px">
                    {product.price}
                  </ProductItemData>
                </ProductItem>
              ))
            }
          </ProductList>

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
                Remover todos
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


const ProductList = styled.ul`
  list-style-type: square;
  width: 100%;
  overflow-y: auto;
  max-height: 500px;
  gap: ${props=> props.theme.spacing.xs};
`
const ProductItem = styled.li`
  display: flex;
  justify-content: space-around;
`

const ProductItemRow = styled.span<{ $width?: string | undefined }>`
  width: ${props => props.$width || 'auto'};
`

const ProductItemHeader = styled(ProductItemRow)`
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.medium};
  margin: 3px 0;
`

const ProductItemData = styled(ProductItemRow)`
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.medium};
`

