import { SiBuymeacoffee } from "react-icons/si";
import styled from "styled-components";

export const HeaderPage = () => {
  return (
    <Container>
      <IconContainer>
        <SiBuymeacoffee />
      </IconContainer>
      <Title>Shop Flow</Title>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg};
  height: calc(${props => props.theme.spacing.lg} * 3.5);
  background-color: #007aff;
`
const IconContainer = styled.div`
  svg {
    font-size: calc(${props => props.theme.fontSizes.extraLarge} * 2);
    color: ${props => props.theme.colors.icon}
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.extraLarge};
  color: ${props => props.theme.colors.textPrimaryDark};
`
