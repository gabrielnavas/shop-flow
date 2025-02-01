import styled from "styled-components";

export const SelectOption = styled.option`
  cursor: pointer;
  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textPrimary};
`