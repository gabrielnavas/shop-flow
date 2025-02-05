import React from "react";
import { FaShopify } from "react-icons/fa6";
import { Link } from "react-router";
import styled from "styled-components";

import { routeNames } from "../../routes/routes-names";
import { CartContext, CartContextType } from "../../contexts/CartContext/CartContext";
import { MenuRightSideHeader } from "./MenuRightSideHeader";


export const HeaderPage = () => {
  const { items } = React.useContext(CartContext) as CartContextType

  return (
    <Container>
      <LeftSide to={routeNames.home}>
        <LogoIconContainer>
          <FaShopify />
        </LogoIconContainer>
        <Title>Shop Flow</Title>
      </LeftSide>
      <RightSide>
        <MenuRightSideHeader cartItems={items} />
      </RightSide>
    </Container>
  )
}

const Container = styled.div`
  position: sticky;
  top: 0; /* Fixa no topo da página */
  z-index: 100; /* Garante que fique acima de outros elementos */

  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: ${props => props.theme.spacing.lg};
  height: calc(${props => props.theme.spacing.lg} * 2.5);
  background-color: #007aff;
  
  width: 100%;

  box-shadow: ${props => props.theme.shadows.card} 0px 5px 15px;

  @media (max-width: 768px) {
    height: ${props => props.theme.spacing.sm};
  }
`

const LeftSide = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
`

const RightSide = styled.div`
`

const LogoIconContainer = styled.div`
  svg {
    font-size: calc(${props => props.theme.fontSizes.extraLarge} * 2);
    color: ${props => props.theme.colors.icon}
  }

  @media (max-width: 768px) {
    svg {
      font-size: calc(${props => props.theme.fontSizes.small} * 2);
    }
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.extraLarge};
  color: ${props => props.theme.colors.textPrimaryDark};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.fontSizes.small};
  }
`
