import styled from "styled-components";

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  gap: ${props => props.theme.spacing.md};
`
