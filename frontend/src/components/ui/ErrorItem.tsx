import styled from "styled-components";

export const ErrorItem = styled.span<{ $flexColumn?: boolean }>`
  display: ${props => props.$flexColumn ? 'flex' : 'block'};
  flex-direction: ${props => props.$flexColumn ? 'column' : 'row'};
  align-items: ${props => props.$flexColumn ? 'center' : 'flex-start'};
  justify-content: ${props => props.$flexColumn ? 'flex-start' : 'center'};
  color: ${props => props.theme.colors.error};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
  gap: ${props => props.theme.spacing.sm};
`