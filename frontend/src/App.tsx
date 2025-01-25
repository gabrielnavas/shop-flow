import { useEffect } from "react"
import styled from "styled-components"

export const App = () => {
  useEffect(() => {
    document.title="Hello World!"
  }, [])

  return (
    <Container>Hello World</Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: green;
  font-weight: bold;
  font-size: 80px;
`