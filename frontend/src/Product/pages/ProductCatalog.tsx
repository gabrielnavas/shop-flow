import styled from "styled-components"
import { HeaderPage } from "../../components/HeaderPage"
import React, { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard"
import { Product } from "../types"
import { ProductService } from "../services/product-service"
import { ImSad2 } from "react-icons/im"

export const ProductCatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  

  React.useEffect(() => {
    document.title = 'Shop flow | Produtos'
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      const productService = new ProductService()
      const products = await productService.findProducts()
      setProducts(products)
    }

    fetchProducts()
  }, [])


  return (
    <Page>
      <HeaderPage />
      {
        products.length === 0 ? (
          <ProductListEmpty>
            <span>Nenhum produto encontrado.</span>
            <ImSad2 />
          </ProductListEmpty>
        ) : (
          <Products>
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              added={index % 2 === 0} />
          ))}
        </Products>
        )
      }
    </Page>
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
  calc(${props => props.theme.spacing.lg} * 3.5)
  ;
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