import styled from "styled-components";

export const ButtonIconContainer = styled.span`
  svg {
    color: ${props => props.theme.colors.iconDark};
    font-size: ${props => props.theme.fontSizes.medium};
  }
`