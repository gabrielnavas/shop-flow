import { HeaderPage } from "../../components/layout/HeaderPage"
import { Page } from "../../components/ui/Page"
import styled from "styled-components"
import React from "react"
import { Product, ProductService } from "../../services/product-service"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { Button } from "../../components/ui/Button"
import { BiPlusCircle, BiTrash } from "react-icons/bi"
import { RxUpdate } from "react-icons/rx"

type ProductItem = {
  selected: boolean
  product: Product
}

export const ManageProductPage = () => {


  const [products, setProducts] = React.useState<ProductItem[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [globalError, setGlobalError] = React.useState<string>('')

  const widths = {
    selected: '75px',
    name: '450px',
    stock: '50px',
    price: '50px',
    actions: '50px',
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
                  <ButtonIconContainer>
                    <BiTrash />
                  </ButtonIconContainer>
                  Remover todos
                </RemoveItemsButtom>
                <AddNewProductButtom onClick={() => { }}>
                  <ButtonIconContainer>
                    <BiPlusCircle />
                  </ButtonIconContainer>
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
                        <ButtonIconContainer>
                          <RxUpdate />
                        </ButtonIconContainer>
                      </EditButton>
                      <RemoveButton>
                        <ButtonIconContainer>
                          <BiTrash />
                        </ButtonIconContainer>
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

const ButtonIconContainer = styled.span`
  svg {
    color: ${props => props.theme.colors.iconDark};
    font-size: ${props => props.theme.fontSizes.medium};
  }
`

const RemoveButtonBase = styled(Button)`
  background-color: #f8d7da;
  color: #721c24;
  border: #f5c6cb;
`

const RemoveItemsButtom = styled(RemoveButtonBase)``
const AddNewProductButtom = styled(Button)``

const SelectAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
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

const EditButton = styled(Button)`
  background-color: #fff3cd;
  color: #856404;
  border: #ffeeba;
`


const RemoveButton = styled(RemoveButtonBase)`
`
