import styled from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "warning" | "error" | "add" | "cancel" | "link";
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.xs};
  padding: ${(props) => props.theme.spacing.sm};
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.default};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.small};

  /* Define a cor do botão com base no "$variant" */
  background-color: ${({ theme, $variant }) =>
    $variant === "warning"
      ? theme.colors.buttonBackgroundWarning
      : $variant === "error"
      ? theme.colors.buttonBackgroundError
      : $variant === "cancel"
      ? theme.colors.buttonBackgroundCancel
      : $variant === "link"
      ? "transparent" // Fundo transparente para o botão link
      : theme.colors.buttonBackgroundPrimary};

  color: ${({ theme, $variant }) =>
    $variant === "link"
      ? theme.colors.link // Cor do texto para o botão link
      : theme.colors.buttonColorPrimary};

  &:hover,
  &:active {
    background-color: ${({ theme, $variant }) =>
      $variant === "warning"
        ? theme.colors.buttonBackgroundWarningHover
        : $variant === "error"
        ? theme.colors.buttonBackgroundErrorHover
        : $variant === "cancel"
        ? theme.colors.buttonBackgroundCancelHover
        : $variant === "link"
        ? "transparent" // Mantém o fundo transparente no hover
        : theme.colors.buttonBackgroundHover};

    color: ${({ theme, $variant }) =>
      $variant === "link"
        ? theme.colors.link // Mantém a cor do texto no hover
        : theme.colors.buttonColorPrimary};
  }

  /* Estilo específico para o botão link */
  ${({ $variant, theme }) =>
    $variant === "link" &&
    `
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: ${theme.fontSizes.medium};
  `}
`;