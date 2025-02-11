import styled from "styled-components"

export const RequiredInput = () => {
  return (
    <Container>
      <Content>*</Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 calc(${props => props.theme.spacing.xs} * 0.60);
`
const Content = styled.span`
  color: ${props => props.theme.colors.error}
`
