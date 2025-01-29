import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const Label = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.label`
  color: ${props => props.theme.colors.textPrimary};
`
