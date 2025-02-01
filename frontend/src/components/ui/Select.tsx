import styled from "styled-components";

export const Select = styled.select<{ $error: boolean }>`
width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textPrimary};
  border-radius: ${props => props.theme.borderRadius.default};
  outline: none;
  border: 1px solid ${props => props.theme.colors.borderColor};


  &:hover,&:focus {
    border: 1px solid ${props => props.$error ? props.theme.colors.error : props.theme.colors.borderColorHoverActive};
  }
`
