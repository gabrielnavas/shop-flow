import React, { useCallback } from "react";
import { FaShopify } from "react-icons/fa6";

import styled from "styled-components";
import { AuthContext, AuthContextType } from "../contexts/auth";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router";
import { routes } from "../Routes";

export const HeaderPage = () => {
  const { isAuthencated, signout } = React.useContext(AuthContext) as AuthContextType

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

  const menuOnClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  }, []);

  const logoutOnClick = useCallback(() => {
    signout()
    navigate(routes.signin)
  }, [signout, navigate])

  return (
    <Container>
      <LeftSide>
        <LogoIconContainer>
          <FaShopify />
        </LogoIconContainer>
        <Title>Shop Flow</Title>
      </LeftSide>
      <RightSide>
        {isAuthencated && (
          <MenuRightSide onClick={menuOnClick}>
            <UserButtonContainer>
              <BiUser />
            </UserButtonContainer>
          </MenuRightSide>
        )}
      </RightSide>
      {isAuthencated && openMenu && (
        <Menu ref={menuRef}>
          <MenuItem onClick={logoutOnClick}>
            <BiLogOut />
            Sair
          </MenuItem>
        </Menu>
      )}
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

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`

const RightSide = styled.div`
`

const MenuRightSide = styled.div`
`

const UserButtonContainer = styled.button`
  box-shadow: ${props => props.theme.shadows.button};
  cursor: pointer;
  background-color: #0000;
  border: 1px solid ${props => props.theme.colors.borderColor};

  border-radius: ${props => props.theme.borderRadius.round};
  padding: ${props => props.theme.spacing.xs};
  svg {
      font-size: calc(${props => props.theme.fontSizes.extraLarge} * 1.5);
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


  @media (max-width: 768px) {
    svg {
      font-size: calc(${props => props.theme.fontSizes.medium} * 1.5);
    };
  }
`

const Menu = styled.ul`
  background-color: ${props => props.theme.colors.menuBackgroundColor};
  position: absolute;
  bottom: calc(
    calc(
      -${props => props.theme.spacing.lg} 
      * 2.5
    ) 
    - 0.5rem
  ); 
  right: 0.5rem;
  width: 110px;
  border: 0.5px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
`

const MenuItem = styled.li`
  box-shadow: ${props => props.theme.shadows.button};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: calc(${props => props.theme.spacing.sm} * 2);
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
