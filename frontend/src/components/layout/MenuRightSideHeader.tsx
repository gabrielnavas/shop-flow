import React from "react";
import { BiCart, BiLogOut, BiPackage, BiUser } from "react-icons/bi";
import { useNavigate } from "react-router";
import { FaSignInAlt } from "react-icons/fa";
import { GrUserNew } from "react-icons/gr";
import styled from "styled-components";

import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext";
import { routeNames } from "../../routes/routes-names";
import { CartItem } from "../../contexts/CartContext/CartContext";

type Props = {
  cartItems: CartItem[]
}

export const MenuRightSideHeader = ({ cartItems }: Props) => {
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

  const menuOnClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenMenu((prev) => !prev);
  }, []);

  const cartOnClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(routeNames.cart)
  }, [navigate]);

  const logoutOnClick = React.useCallback(() => {
    signout()
    navigate(routeNames.home)
    window.location.reload();
  }, [signout, navigate])


  const signinOnClick = React.useCallback(() => {
    navigate(routeNames.signin)
  }, [navigate])

  const signupOnClick = React.useCallback(() => {
    navigate(routeNames.signup)
  }, [navigate])


  const manageProductOnClick = React.useCallback(() => {
    navigate(routeNames.manageProduct)
  }, [navigate])


  return (

    <MenuRightSide>
      <ButtonContainer onClick={menuOnClick}>
        <BiUser />
      </ButtonContainer>
      <CartButtonContainer onClick={cartOnClick}>
        <CartButtonCountContainer>
          {cartItems.length}
        </CartButtonCountContainer>
        <BiCart />
      </CartButtonContainer>

      {openMenu && (
        <Menu $menuItemsCount={2.75} ref={menuRef}>
          {
            isAuthencated ? (
              <>
                {isAuthencated && (
                  <MenuItem onClick={manageProductOnClick}>
                    <BiPackage />
                    Gerenciar produtos
                  </MenuItem>
                )}
                <MenuItem onClick={logoutOnClick}>
                  <BiLogOut />
                  Sair
                </MenuItem>
              </>
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

  )
}


const Menu = styled.ul<{ $menuItemsCount: number }>`
  background-color: ${props => props.theme.colors.menuBackgroundColor};
  position: absolute;
  bottom: calc(-200% + (50% * -${({ $menuItemsCount }) => $menuItemsCount})); 
  right: 50%;
  border: 0.5px solid ${props => props.theme.colors.borderColor};
  border-radius: ${props => props.theme.borderRadius.default};
  width: 220px;
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


const MenuRightSide = styled.div`
  position: relative;

  display: flex;
  gap: ${props => props.theme.spacing.sm};
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
