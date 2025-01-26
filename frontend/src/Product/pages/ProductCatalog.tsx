import styled from "styled-components"
import { HeaderPage } from "../../components/HeaderPage"
import { useContext } from "react"
import { AuthContext, AuthContextType } from "../../contexts/auth"
import { useNavigate } from "react-router"
import { routes } from "../../Routes"

export const ProductCatalogPage = () => {
  const {isAuthencated}  = useContext(AuthContext) as AuthContextType
  
  const navigate = useNavigate()

  if(!isAuthencated) {
    navigate(routes.signin)
  }
  
  return (
    <Page>
      <HeaderPage />
    </Page>
  )
}

const Page = styled.div`
  min-height: 100vh;
`