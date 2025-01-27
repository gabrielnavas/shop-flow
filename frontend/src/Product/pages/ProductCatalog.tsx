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