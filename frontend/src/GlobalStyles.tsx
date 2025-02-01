import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* Importa a fonte Roboto */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

  /* Reset básico e estilos globais */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  /* Personalização da barra de rolagem (Chrome, Edge, Safari) */
  ::-webkit-scrollbar {
    width: 8px; /* Barra de rolagem vertical */
    height: 8px; /* Barra de rolagem horizontal */
  }

  /* Fundo da barra de rolagem */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.border}; /* Cor do fundo */
    border-radius: 10px;
  }

  /* Cor da barra de rolagem */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.buttonBackgroundPrimary}; /* Azul principal */
    border-radius: 10px;
  }

  /* Efeito ao passar o mouse */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.buttonBackgroundHover}; /* Azul mais escuro */
  }

  /* Personalização para Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.buttonBackgroundPrimary} ${({ theme }) => theme.border};
  }
`;

export default GlobalStyles;
