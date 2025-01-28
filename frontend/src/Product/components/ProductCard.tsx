import { BsCartCheckFill } from "react-icons/bs"
import { FaCartPlus } from "react-icons/fa6"
import styled from "styled-components"
import { Product } from "../types"

type Props = {
  added: boolean
  product: Product
}

export const ProductCard = ({ added, product }: Props) => {

  return (
    <Container>
      <Image src={product.imageUrl} />
      <Info>
        <Titles>
          <Title>{product.name}</Title>
          <Subtitles>{product.description}</Subtitles>
        </Titles>
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
  border-top-left-radius: ${props => props.theme.borderRadius.default};
  border-top-right-radius: ${props => props.theme.borderRadius.default};
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.sm};
  border-bottom-left-radius: ${props => props.theme.borderRadius.default};
  border-bottom-right-radius: ${props => props.theme.borderRadius.default};
  background-color: ${props => props.theme.colors.background};
`

const Titles = styled.span`
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textPrimary};
`

const Subtitles = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: calc(${props => props.theme.fontSizes.small} * 0.90);
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

