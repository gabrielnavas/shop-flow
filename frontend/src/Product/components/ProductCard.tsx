import { BsCartCheckFill } from "react-icons/bs"
import { FaCartPlus } from "react-icons/fa6"
import styled from "styled-components"

type Props = {
  added: boolean
}

export const ProductCard = ({ added }: Props) => {

  return (
    <Container>
      <Image src={'/src/assets/imgs/no-image.jpg'} />
      <Info>
        <Title>Blusa bonita</Title>
        <CardBottom>
          <PriceContainer>
            <PriceTitle>Preço</PriceTitle>
            <PriceValue>R$200,00</PriceValue>
          </PriceContainer>
          <AddToCardButton $added={added}>
            {added ?  <BsCartCheckFill /> : <FaCartPlus />}
          </AddToCardButton>
        </CardBottom>
      </Info>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid ${props => props.theme.colors.borderColor};
  outline: none;

  box-shadow: ${props => props.theme.shadows.card};

  cursor: pointer;

  transition: 500ms;

  &:hover {
    transform: scale(1.10);
  }
`

const Image = styled.img`
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.sm};
`

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textPrimary};
`

const CardBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 70px;
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PriceTitle = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizes.small};
`

const PriceValue = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.small};
`

const AddToCardButton = styled.div<{ $added: boolean }>`
  display: flex;
  border-radius: ${props => props.theme.borderRadius.default};
  border: 1px solid none;
  padding: 12px;
  background-color: ${props => props.theme.colors.buttonBackgroundPrimary};

  box-shadow: ${props => props.theme.shadows.button};

  svg {
    font-size: ${props => props.theme.fontSizes.large};
    color: ${props => props.theme.colors.buttonColorPrimary};
  }

  cursor: ${props => props.$added ? 'default' : 'pointer'};

  transition: 200ms;

  ${props =>
    !props.$added ?
    `
      &:hover {
        transform: scale(1.10);

        border: 1px solid ${props.theme.colors.buttonBackgroundPrimary};
        background-color: ${props.theme.colors.buttonColorPrimary};
        svg {
          color: ${props.theme.colors.buttonBackgroundPrimary};
        }
      }
      &:active {
        transform: scale(1.10);

        border: 1px solid ${props.theme.colors.buttonColorPrimary};
        background-color: ${props.theme.colors.buttonBackgroundPrimary};
        svg {
          color: ${props.theme.colors.buttonBackgroundPrimary};
        }
      }
  ` : `
      border: 1px solid ${props.theme.colors.buttonBackgroundPrimary};
      background-color: ${props.theme.colors.buttonColorPrimary};

      svg {
        color: ${props.theme.colors.buttonBackgroundPrimary};
      }
  `}
`

