import React from "react"
import { BiPlusCircle } from "react-icons/bi"

import { ButtonIconContainer } from "../../components/ui/ButtonIconContainer"
import { Button } from "../../components/ui/Button"
import { ProductModal } from "./ProductModal"

export const AddNewProductItemButton = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  return (
    <>
      <ProductModal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)} />
      <Button $variant="add" onClick={() => setIsOpenModal(true)}>
        <ButtonIconContainer>
          <BiPlusCircle />
        </ButtonIconContainer>
        Novo Produto
      </Button>
    </>
  )
}
