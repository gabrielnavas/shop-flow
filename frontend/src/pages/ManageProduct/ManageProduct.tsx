import styled from "styled-components"
import React from "react"

import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { ProductContext, ProductContextType } from "../../contexts/ProductContext/ProductContext"
import { RemoveProductItemButton } from "./RemoveProductItemButton"
import { Product } from "../../services/entities"
import { LoadingIcon } from "../../components/ui/LoadingContainer"
import { RemoveProductItemsButton } from "./RemoveProductItemsButton"
import { UpdateProductItemButton } from "./UpdateProductItemButton"
import { AddNewProductItemButton } from "./AddNewProductItemButton"

type ProductItem = {
  selected: boolean
  product: Product
}

export const ManageProductPage = () => {

  const [productItems, setProductItems] = React.useState<ProductItem[]>([])
  const [globalError, setGlobalError] = React.useState<string>('')
  const [selectedAll, setSelectedAll] = React.useState(false)

  const {
    items,
    globalError: globalErrorContext,
    isLoading
  } = React.useContext(ProductContext) as ProductContextType

  const widths = {
    selected: '75px',
    name: '150px',
    description: '450px',
    stock: '50px',
    price: '50px',
    actions: '50px',
  }

  React.useEffect(() => {
    document.title = 'Shop flow | Gerenciar produtos'
  }, [])

  React.useEffect(() => {
    function fetchProductItems() {
      if (!items) {
        return
      }
      if (globalErrorContext) {
        setGlobalError(globalErrorContext)
        return
      }

      setProductItems(items.map(product => ({
        product: product,
        selected: false,
      })))
    }

    fetchProductItems()
  }, [items, globalErrorContext])

  const toggleSelectProductItemOnClick = React.useCallback((productId: number) => {
    setProductItems(prev => prev.map(productItem => {
      const newProductItem = {...productItem}
      if(newProductItem.product.id === productId) {
        newProductItem.selected = !newProductItem.selected
      }
      return {...newProductItem}
    }))
  }, [])

  const toggleSelectAllProductItemsOnClick = React.useCallback(() => {
    setSelectedAll(prev => !prev)
    setProductItems(prev => prev.map(item => {
      const newItems = { ...item }
      newItems.selected = !newItems.selected
      return newItems
    }))
  }, [])

  // TODO: melhorar a forma que o loading é mostrado
  if (isLoading) {
    return <LoadingIcon />
  }

  return (
    <Page>
      <HeaderPage />
      <Content>
        <Rows $padding="20px">
          <Row>
            {!!globalError && (
              <ErrorList>
                <ErrorItem>
                  {globalError}
                </ErrorItem>
              </ErrorList>
            )}
          </Row>
          <Row>
            <TableTop>
              <TableTitle>
                Gerenciar produtos
              </TableTitle>
              <TableButtons>
                <RemoveProductItemsButton
                  products={
                    productItems.filter(productItem => productItem.selected)
                      .map(productItem => productItem.product)}
                />
                <AddNewProductItemButton />
              </TableButtons>
            </TableTop>
          </Row>
          <Row>
            <Table>
              <thead>
                <Tr>
                  <Th $width={widths.selected}>
                    <Selected
                      type="checkbox"
                      checked={selectedAll}
                      onChange={() => toggleSelectAllProductItemsOnClick()} />
                  </Th>
                  <Th $width={widths.name}>Nome</Th>
                  <Th $width={widths.description}>Descrição</Th>
                  <Th $width={widths.stock}>Estoque</Th>
                  <Th $width={widths.price}>Preço</Th>
                  <Th $width={widths.actions} $justifyContent="flex-end">Ações</Th>
                </Tr>
              </thead>
              <tbody>
                {productItems.map((item, index) => (
                  <Tr key={index}>
                    <Td $width={widths.selected}>
                      <Selected
                        type="checkbox"
                        checked={item.selected}
                        onClick={() => toggleSelectProductItemOnClick(item.product.id)} />
                    </Td>
                    <Td $width={widths.name}>
                      <TableCeilText>{item.product.name}</TableCeilText>
                    </Td>
                    <Td $width={widths.description}>
                      <TableCeilText>{item.product.description}</TableCeilText>
                    </Td>
                    <Td $width={widths.stock}>
                      <TableCeilText>{item.product.stock}</TableCeilText>
                    </Td>
                    <Td $width={widths.price}>
                      <TableCeilText>{item.product.price}</TableCeilText>
                    </Td>
                    <Td $width={widths.actions}>
                      <TableAction>
                        <RemoveProductItemButton product={item.product} />
                        <UpdateProductItemButton product={item.product} />
                      </TableAction>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Rows>
      </Content >
    </Page>
  )
}

const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`


const Rows = styled.div<{ $padding: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: calc(${props => props.theme.spacing.lg} * 3);
`


const Row = styled.div`
  width: 100%;
`

const TableTop = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${props => props.theme.colors.tableHeaderBackgroundColor};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
 
  font-weight: 500;
`


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* Garante que a largura das colunas seja respeitada */
`

const Tr = styled.tr`
`

const Th = styled.th<{
  $width?: string;
  $justifyContent?: "flex-start" | "center" | "flex-end";
}>`
  width: ${props => props.$width};
  text-align: ${props => props.$justifyContent || "left"};
  padding: 10px;
  border-bottom: 2px solid ${props => props.theme.colors.borderColor};
`

const Td = styled.td<{
  $width?: string,
}>`
  width: ${props => props.$width};
  min-width: ${props => props.$width}; /* Garante que a célula não fique menor */
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.borderColor};
`

const TableTitle = styled.span`
  color: ${props => props.theme.colors.menuBackgroundColor};
`

const TableButtons = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`

const Selected = styled.input`
  height: 20px;
  width: 20px;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.borderColor};

  cursor: pointer;

  &:hover,&active {
    border: 1px solid ${props => props.theme.borderColorHoverActiveFocus};
  }
`

const TableCeilText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TableAction = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
`
