import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm};
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: ${props => props.theme.borderRadius.default};
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
  color: ${props => props.theme.colors.buttonColorPrimary};

  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.small};

  &:hover, &:active {
    color: ${props => props.theme.colors.buttonBackgroundPrimary};
    background-color: ${props => props.theme.colors.buttonColorPrimary};
  }
`