import styled from "styled-components";

export const LinkContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;

  color: ${props => props.theme.colors.textPrimary};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.medium};
`