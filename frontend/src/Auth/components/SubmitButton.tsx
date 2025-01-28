import styled, { keyframes } from "styled-components";

// Keyframes para a animação de rotação
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button<{ $isLoading: boolean }>`
  width: 100%;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
  outline: none;
  border: none;
  cursor: ${props => props.$isLoading ? 'default': 'pointer'};
  background-color: ${(props) => props.theme.colors.buttonBackgroundPrimary};
  border-radius: ${(props) => props.theme.borderRadius.default};
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    !props.$isLoading && `
      &:hover {
        background-color: ${props.theme.colors.buttonBackgroundHover};
      }
    `
  }

  span {
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: 500;
    color: ${(props) => props.theme.colors.buttonColorPrimary};
  }

  svg { /* Estiliza o ícone de loading */
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.buttonColorPrimary};
    animation: ${rotate} 1s linear infinite; /* Aplica a animação */
  }
`;
