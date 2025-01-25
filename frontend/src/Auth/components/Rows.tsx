import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const Rows = ({ children }: Props) => {
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
  gap: ${props => props.theme.spacing.md};
  padding: calc(${props => props.theme.spacing.lg} * 3);
`
