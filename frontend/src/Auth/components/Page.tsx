import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const Page = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
`
