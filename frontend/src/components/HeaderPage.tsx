import React from "react";
import { FaShopify } from "react-icons/fa6";

import styled from "styled-components";
import { AuthContext, AuthContextType } from "../contexts/AuthContext/AuthContext";
import { BiCart, BiLogOut, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { routes } from "../Routes";
import { CartContext, CartContextType } from "../contexts/CartContext/CartContext";
import { FaSignInAlt } from "react-icons/fa";
import { GrUserNew } from "react-icons/gr";

export const HeaderPage = () => {
  const { isAuthencated, signout } = React.useContext(AuthContext) as AuthContextType

  const { items } = React.useContext(CartContext) as CartContextType

  const [openMenu, setOpenMenu] = React.useState(false)
  const menuRef = React.useRef<HTMLUListElement | null>(null)

  const navigate = useNavigate()

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuOnClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  }, []);

  const logoutOnClick = React.useCallback(() => {
    signout()
    navigate(routes.home)
    window.location.reload();
  }, [signout, navigate])


  const signinOnClick = React.useCallback(() => {
    navigate(routes.signin)
  }, [navigate])


  const signupOnClick = React.useCallback(() => {
    navigate(routes.signup)
  }, [navigate])


  return (
    <Container>
      <LeftSide to={routes.home}>
        <LogoIconContainer>
          <FaShopify />
        </LogoIconContainer>
        <Title>Shop Flow</Title>
      </LeftSide>
      <RightSide>
        <MenuRightSide onClick={menuOnClick}>
          <ButtonContainer>
            <BiUser />
          </ButtonContainer>
          <CartButtonContainer>
            <CartButtonCountContainer>
              {items.length}
            </CartButtonCountContainer>
            <BiCart />
          </CartButtonContainer>

          {openMenu && (
            <Menu $menuItemsCount={isAuthencated ? 0.2 : 2.75} ref={menuRef}>
              {
                isAuthencated ? (
                  <MenuItem onClick={logoutOnClick}>
                    <BiLogOut />
                    Sair
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem onClick={signinOnClick}>
                      <FaSignInAlt />
                      Entrar
                    </MenuItem>
                    <MenuItem onClick={signupOnClick}>
                      <GrUserNew />
                      Criar conta
                    </MenuItem>
                  </>
                )
              }
            </Menu>
          )}
        </MenuRightSide>
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

const MenuRightSide = styled.div`
  position: relative;

  display: flex;
  gap: ${props => props.theme.spacing.sm};
`

const ButtonContainer = styled.button`
  box-shadow: ${props => props.theme.shadows.button};
  cursor: pointer;
  background-color: #0000;
  border: 1px solid ${props => props.theme.colors.borderColor};

  border-radius: ${props => props.theme.borderRadius.round};
  padding: ${props => props.theme.spacing.xs};
  svg {
    font-size: ${props => props.theme.fontSizes.extraLarge};
    color: ${props => props.theme.colors.icon}
  };

  transition: 200ms all;

  &:hover {
    background-color: #FFF;
    border: 1px solid #0000;

    svg {
      color: #000;
    }

    transform: scale(1.1);
  }

  @media (max-width: 900px) {
    svg {
      font-size: calc(${props => props.theme.fontSizes.small});
    };
  }
`

const CartButtonContainer = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const CartButtonCountContainer = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: ${props => props.theme.colors.buttonColorPrimary}66;
  color: ${props => props.theme.colors.textPrimary};
  font-weight: 500;
  border-radius: ${props => props.theme.borderRadius.round};
  padding: 
    calc(${props => props.theme.spacing.xs} * 1.8)
    calc(${props => props.theme.spacing.xs} * 2.3);
  font-size: ${props => props.theme.fontSizes.small};


  @media (max-width: 900px) {
    top: -13px;
    right: -13px;
    padding: 
      calc(${props => props.theme.spacing.xs} * 1.2)
      calc(${props => props.theme.spacing.xs} * 1.8);
    font-size: calc(${props => props.theme.fontSizes.small} * 0.85);
  }
`

const Menu = styled.ul<{$menuItemsCount: number}>`
  background-color: ${props => props.theme.colors.menuBackgroundColor};
  position: absolute;
  bottom: calc(-200% + (50% * -${({ $menuItemsCount }) => $menuItemsCount})); 
  right: 50%;
  border: 0.5px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
  width: 150px;
  padding: 2.5px 5px;
`

const MenuItem = styled.li`
  box-shadow: ${props => props.theme.shadows.button};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0;
  gap: 10px;
  padding: calc(${props => props.theme.spacing.sm});
  background-color: ${props => props.theme.colors.menuBackgroundColor};
  cursor: pointer;
  list-style-type: none;
  border-radius: ${props => props.theme.borderRadius.default};

  font-weight: 500;
  font-size: ${props => props.theme.fontSizes.medium};

  &:hover {
    background-color: ${props => props.theme.colors.menuBackgroundColorHover};
  }

  svg {
    font-size: calc(${props => props.theme.fontSizes.large} );
    color: ${props => props.theme.colors.darkIcon}
  }
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
