import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const CardHeader = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.md} 0;
`
