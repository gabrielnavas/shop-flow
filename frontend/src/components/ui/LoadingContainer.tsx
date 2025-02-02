import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";


export const LoadingIcon = () => {
  return (
    <Container>
      <AiOutlineLoading />
    </Container>
  )
}

// Keyframes para a animação de rotação
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  margin-top: calc(${props => props.theme.spacing.md} * 6);
  svg { /* Estiliza o ícone de loading */
    font-size: calc(${(props) => props.theme.fontSizes.extraLarge} * 2.5);
    color: ${(props) => props.theme.colors.darkIcon};
    animation: ${rotate} 1s linear infinite; /* Aplica a animação */
  }
`