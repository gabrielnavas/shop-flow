import React from "react"

import { ButtonIconContainer } from "./ButtonIconContainer"
import { Button } from "../../components/ui/Button"
import { Product } from "../../services/entities"
import { ProductModal } from "./ProductModal"
import { RxUpdate } from "react-icons/rx"

type Props = {
  product: Product
}

export const UpdateProductItemButton = ({ product }: Props) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  return (
    <>
      <ProductModal
        product={product}
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)} />
      <Button $variant="cancel" onClick={() => setIsOpenModal(true)}>
        <ButtonIconContainer>
          <RxUpdate />
        </ButtonIconContainer>
      </Button>
    </>
  )
}
