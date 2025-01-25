import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const HeaderTitle = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.span`
  font-weight: 500;
  font-size: calc(${props => props.theme.fontSizes.extraLarge} * 1.45);
`
