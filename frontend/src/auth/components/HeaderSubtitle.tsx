import styled from "styled-components"

type Props = {
  children: React.ReactNode
}

export const HeaderSubtitle = ({ children }: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.span`
  font-weight: 400;
  color: ${props => props.theme.colors.textPrimary};
  font-size: ${props => props.theme.fontSizes.small};
`
