import { GrUpdate } from "react-icons/gr"
import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import { CgAdd, CgRemove } from "react-icons/cg"
import styled from "styled-components"
import React from "react"
import { Product, ProductService } from "../../services/product-service"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"

type ProductItem = {
  selected: boolean
  product: Product
}

export const ManageProductPage = () => {


  const [products, setProducts] = React.useState<ProductItem[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [globalError, setGlobalError] = React.useState<string>('')

  const widths = {
    selected: '100px',
    name: '250px',
    stock: '100px',
    price: '100px',
    actions: '100px',
  }

  React.useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const productService = new ProductService()
        const products = await productService.findProducts()
        setProducts(products.map(product => ({
          selected: false,
          product,
        })))
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Tente novamente mais tarde.')
        }
      }

      setIsLoading(false)

    }
    fetchProducts()
  }, [])

  // TODO: melhorar isso
  if (isLoading) {
    return <div>Carregando...</div>
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
                <RemoveItemsButtom onClick={() => { }}>
                  <TableButtonIconContainer>
                    <CgRemove />
                  </TableButtonIconContainer>
                  Remover todos
                </RemoveItemsButtom>
                <AddNewProductButtom onClick={() => { }}>
                  <TableButtonIconContainer>
                    <CgAdd />
                  </TableButtonIconContainer>
                  Novo Produto
                </AddNewProductButtom>
              </TableButtons>
            </TableTop>
          </Row>
          <Row>
            <Table>
              <Tr>
                <Th $width={widths.selected}>
                  <SelectAllContainer>
                    <Selected type="checkbox" checked={false} />
                    Selecione
                  </SelectAllContainer>
                </Th>
                <Th $width={widths.name}>Nome</Th>
                <Th $width={widths.stock}>Estoque</Th>
                <Th $width={widths.price}>Preço</Th>
                <Th $width={widths.actions} $justifyContent="flex-end">Ações</Th>
              </Tr>

              {products.map((item, index) => (
                <Tr key={index}>
                  <Td $width={widths.selected}>
                    <Selected type="checkbox" checked={item.product.id % 2 === 0} />
                  </Td>
                  <Td $width={widths.name}>
                    <TableCeilText>{item.product.name}</TableCeilText>
                  </Td>
                  <Td $width={widths.stock}>
                    <TableCeilText>{item.product.stock}</TableCeilText>
                  </Td>
                  <Td $width={widths.price}>
                    <TableCeilText>{item.product.price}</TableCeilText>
                  </Td>
                  <Td $width={widths.actions}>
                    <TableAction>
                      <EditButton>
                        <GrUpdate />
                      </EditButton>
                      <RemoveButton>
                        <CgRemove />
                      </RemoveButton>
                    </TableAction>
                  </Td>
                </Tr>
              ))}
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

const TableButtonIconContainer = styled.span`
  svg {
    color: ${props => props.theme.colors.iconDark};
    font-size: ${props => props.theme.fontSizes.medium};
  }
  
`

const ButtonHeaderBase = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.buttonColorPrimary};
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
  outline: none;
  cursor: pointer;
  border: none;

  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.small};
  border-radius: ${props => props.theme.borderRadius.default};

  &:hover, &:active {
    color: ${props => props.theme.colors.buttonBackgroundPrimary};
    background-color: ${props => props.theme.colors.buttonColorPrimary};
  }
`

const RemoveItemsButtom = styled(ButtonHeaderBase)``
const AddNewProductButtom = styled(ButtonHeaderBase)``

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const ButtonActionBase = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.buttonColorPrimary};
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
  outline: none;
  cursor: pointer;
  border: none;

  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.small};
  border-radius: ${props => props.theme.borderRadius.default};

  &:hover, &:active {
    color: ${props => props.theme.colors.buttonBackgroundPrimary};
    background-color: ${props => props.theme.colors.buttonColorPrimary};
  }
`

const EditButton = styled(ButtonActionBase)`
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
`
const RemoveButton = styled(ButtonActionBase)`

`
