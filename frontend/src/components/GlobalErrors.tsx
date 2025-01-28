import styled from "styled-components";

export const GlobalErrors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #FF828051;
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: ${props => props.theme.borderRadius.default};
  padding: ${props => props.theme.spacing.lg};
`


