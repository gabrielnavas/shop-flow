import styled from "styled-components";


export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  outline: none;
  border: 1px solid ${({ theme, $error }) => $error ? theme.colors.error : theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover,
  &:focus {
    border-color: ${({ $error, theme }) =>
      $error ? theme.colors.error : theme.colors.borderColorHoverActiveFocus};
  }

  &:focus {
    box-shadow: ${({ $error, theme }) =>
      $error ? `0 0 4px ${theme.colors.error}` : `0 0 4px ${theme.colors.borderColorHoverActiveFocus}`};
  }
`;
