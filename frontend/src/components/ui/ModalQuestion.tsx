import styled from "styled-components";

export const ModalQuestion = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: bold;
`