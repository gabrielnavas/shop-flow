import styled, { keyframes } from "styled-components"
import { HeaderPage } from "../../components/HeaderPage"
import React, { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard"
import { Product } from "../types"
import { ProductService } from "../services/product-service"
import { ImSad2 } from "react-icons/im"
import { AiOutlineLoading } from "react-icons/ai"
import { GlobalErrors } from "../../components/GlobalErrors"
import { BiSad } from "react-icons/bi"

export const ProductCatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [globalError, setGlobalError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    document.title = 'Shop flow | Produtos'
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)

      try {
        const productService = new ProductService()
        const products = await productService.findProducts()
        setProducts(products)
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Algo aconteceu. Aguarde e tente novamente.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])


  let contentRender = null

  if (isLoading) {
    contentRender = (
      <IsLoadingContainer>
        <AiOutlineLoading />
      </IsLoadingContainer>
    )
  } else if (!isLoading && products.length === 0) {
    contentRender = (
      <ProductListEmpty>
        <span>Nenhum produto encontrado.</span>
        <ImSad2 />
      </ProductListEmpty>
    )
  } else if (!isLoading && products.length && !!globalError) {
    contentRender = (
      <GlobalErrorsProduct>
        <span>{globalError}</span>
        <BiSad />
      </GlobalErrorsProduct>
    )
  } else if (!isLoading && !(globalError) && products.length > 0) {
    contentRender = (
      <Products>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} />
        ))}
      </Products>
    )
  }

  return (
    <Page>
      <HeaderPage />
      {contentRender}
    </Page >
  )
}


const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
`

const ProductListEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(${props => props.theme.spacing.lg} * 2.5)
  calc(${props => props.theme.spacing.lg} * 3.5);
  margin-top: calc(${props => props.theme.spacing.lg} * 4);
  border-radius: ${props => props.theme.borderRadius.default};
  gap: ${props => props.theme.spacing.lg};

  border: 1px solid ${props => props.theme.colors.borderColor};
  background-color: ${props => props.theme.background};

  span {
    font-weight: 400;
    font-size: calc(${props => props.theme.fontSizes.extraLarge} * 1.2);
    color: ${props => props.theme.colors.textPrimary};
  }

  svg {
    font-size: calc(${props => props.theme.fontSizes.extraLarge} * 2.5);
    color: ${props => props.theme.colors.darkIcon};
  }
`

const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 
  gap: calc(${props => props.theme.spacing.md} * 2);
  padding: calc(${props => props.theme.spacing.md} * 2) 0;

  @media (max-width: 575.98px) { 
    grid-template-columns: repeat(1, 1fr);  
  }

  @media (min-width: 576px) and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (min-width: 768px) and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);  
  }

  @media (min-width: 1200px) and (max-width: 1400px)  {
    grid-template-columns: repeat(5, 1fr);  
  }
`

const GlobalErrorsProduct = styled(GlobalErrors)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  padding: calc(${props => props.theme.spacing.lg} * 2.5)
  calc(${props => props.theme.spacing.lg} * 3.5);
  margin-top: calc(${props => props.theme.spacing.lg} * 4);

  span {
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes.extraLarge};
  }

  svg {
    font-size: calc(${(props) => props.theme.fontSizes.extraLarge} * 2.5);
  }
`


// Keyframes para a animação de rotação
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const IsLoadingContainer = styled.div`
  margin-top: calc(${props => props.theme.spacing.md} * 6);
  svg { /* Estiliza o ícone de loading */
    font-size: calc(${(props) => props.theme.fontSizes.extraLarge} * 2.5);
    color: ${(props) => props.theme.colors.darkIcon};
    animation: ${rotate} 1s linear infinite; /* Aplica a animação */
  }
`
