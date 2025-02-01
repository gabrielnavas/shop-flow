import React from "react"
import { BiPlusCircle } from "react-icons/bi"

import { ButtonIconContainer } from "./ButtonIconContainer"
import { Button } from "../../components/ui/Button"
import { NewProductModal } from "./NewProductModal"

export const AddNewProductButton = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  return (
    <>
      <NewProductModal
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
