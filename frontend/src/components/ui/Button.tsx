import styled from "styled-components";

interface ButtonProps {
  $variant?: "primary" | "warning" | "error" | "add" | "cancel";
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: ${props => props.theme.borderRadius.default};
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.small};

  /* Define a cor do botão com base no "$variant" */
  background-color: ${({ theme, $variant }) =>
    $variant === "warning"
      ? theme.colors.buttonBackgroundWarning
      : $variant === "error"
      ? theme.colors.buttonBackgroundError
      : $variant === "cancel"
      ? theme.colors.buttonBackgroundCancel
      : theme.colors.buttonBackgroundPrimary};

  color: ${props => props.theme.colors.buttonColorPrimary};

  &:hover, &:active {
    background-color: ${({ theme, $variant }) =>
      $variant === "warning"
        ? theme.colors.buttonBackgroundWarningHover
        : $variant === "error"
        ? theme.colors.buttonBackgroundErrorHover
        : $variant === "cancel"
        ? theme.colors.buttonBackgroundCancelHover
        : theme.colors.buttonBackgroundHover};

    color: ${props => props.theme.colors.buttonColorPrimary};
  }
`;
