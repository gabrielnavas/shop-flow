import styled from "styled-components";

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: 500;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.buttonColorPrimary};
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};
  border-radius: ${props => props.theme.borderRadius.default};

  &:hover {
    background-color: ${props => props.theme.colors.buttonBackgroundHover};
  }
`