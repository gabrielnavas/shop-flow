import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const PageCard = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.borderColor};
`
