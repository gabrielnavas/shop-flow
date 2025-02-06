import styled from "styled-components";

export const InputArea = styled.textarea<{ 
  $error?: boolean;
  $maxLines?: number;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  background-color: ${({ theme }) => theme.colors.cardBackground};
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  resize: vertical;

  ${({ $maxLines }) => 
    $maxLines && `
      height: calc(${$maxLines} * 1.5em); /* 1.5em = 24px de altura padrão por linha */
      max-height: calc(${$maxLines} * 1.5em); /* 1.5em = 24px de altura padrão por linha */
      min-height: calc(${$maxLines} * 1.5em); /* 1.5em = 24px de altura padrão por linha */
    `}

  &:hover, &:focus {
    border-color: ${({ $error, theme }) => 
      $error ? theme.colors.error : theme.colors.borderColorHoverActiveFocus};
  }

  &:focus {
    box-shadow: ${({ $error, theme }) => 
      $error ? `0 0 4px ${theme.colors.error}` : `0 0 4px ${theme.colors.borderColorHoverActiveFocus}`};
  }
`;
