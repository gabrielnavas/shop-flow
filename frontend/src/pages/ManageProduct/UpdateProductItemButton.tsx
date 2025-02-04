import React from "react"

import { ButtonIconContainer } from "./ButtonIconContainer"
import { Button } from "../../components/ui/Button"
import { Product } from "../../services/entities"
import { UpdateProductModal } from "./UpdateProductModal"
import { RxUpdate } from "react-icons/rx"

type Props = {
  product: Product
}

export const UpdateProductItemButton = ({ product }: Props) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  return (
    <>
      <UpdateProductModal
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
