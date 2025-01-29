import styled from "styled-components";

export const FormError = styled.span`
  color: ${props => props.theme.colors.error};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
`