import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const FormGroup = ({ children }: Props) => {
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
  gap: ${props => props.theme.spacing.xs};
`
