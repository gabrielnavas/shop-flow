import styled from "styled-components";

export const FormImagePreview = styled.img`
  height: 480px; /* Tamanho fixo para a imagem */
  height: 640px; /* Tamanho fixo para a imagem */
  border-top-left-radius: ${props => props.theme.borderRadius.default};
  border-top-right-radius: ${props => props.theme.borderRadius.default};
`