import styled from "styled-components"
import { HeaderPage } from "../../components/HeaderPage"
import { useContext } from "react"
import { AuthContext, AuthContextType } from "../../contexts/auth"
import { useNavigate } from "react-router"
import { routes } from "../../Routes"
import { ProductCard } from "../components/ProductCard"

export const ProductCatalogPage = () => {
  const { isAuthencated } = useContext(AuthContext) as AuthContextType

  const navigate = useNavigate()

  if (!isAuthencated) {
    navigate(routes.signin)
  }

  return (
    <Page>
      <HeaderPage />
      <Products>
        {new Array(20).fill('').map((_, index) => (
          <ProductCard key={index} added={index % 2 === 0} />
        ))}
      </Products>
    </Page>
  )
}

const Page = styled.div`
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`


const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Cria 3 colunas com tamanhos iguais */
  gap: calc(${props => props.theme.spacing.md} * 2);
  padding: calc(${props => props.theme.spacing.md} * 2) 0;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(5, 1fr);  /* 3 colunas em telas médias */
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);  /* 3 colunas em telas médias */
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);  /* 2 colunas em telas pequenas */
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);  /* 2 colunas em telas pequenas */
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);  /* 2 colunas em telas pequenas */
  }
`