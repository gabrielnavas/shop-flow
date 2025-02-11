import styled from "styled-components";

export const LinkItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;

  color: ${props => props.theme.colors.textPrimary};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.medium};
`