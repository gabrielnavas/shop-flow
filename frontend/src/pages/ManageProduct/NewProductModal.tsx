import React from "react"
import { useNavigate } from "react-router"
import accounting from "accounting"

import { Button } from "../../components/ui/Button"
import { Form } from "../../components/ui/Form"
import { FormGroup } from "../../components/ui/FormGroup"
import { Label } from "../../components/ui/Label"
import { Select } from "../../components/ui/Select"
import { SelectOption } from "../../components/ui/SelectOption"
import { FormImagePreview } from "../../components/ui/FormImagePreview"
import { FormGroupButton } from "../../components/ui/FormGroupButton"
import { TextArea } from "../../components/ui/TextArea"
import { Input } from "../../components/ui/Input"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ProductService } from "../../services/product-service"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { AiOutlineLoading } from "react-icons/ai"
import { CategoryService } from "../../services/category-service"
import { AuthContext, AuthContextType } from "../../contexts/AuthContext/AuthContext"
import { routeNames } from "../../routes/routes-names"
import { ProductContext, ProductContextType } from "../../contexts/ProductContext/ProductContext"
import { InputFile } from "../../components/ui/InputFile"
import { Category } from "../../services/entities"
import { Modal } from "../../components/ui/Modal"

type Props = {
  isOpenModal: boolean
  onClose: () => void
}

type Inputs = {
  name: string
  description: string
  stock: number
  price: string
  category: string
}

export const NewProductModal = ({ isOpenModal, onClose }: Props) => {
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const [imageUrl, setImageUrl] = React.useState('')
  const imageRef = React.useRef<HTMLInputElement | null>(null)

  const formRef = React.useRef<HTMLFormElement | null>(null)

  const [categories, setCategories] = React.useState<Category[]>([{
    id: 0,
    name: 'Selecione'
  }])

  const { accessToken, isAuthencated } = React.useContext(AuthContext) as AuthContextType
  const { addProduct } = React.useContext(ProductContext) as ProductContextType

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  React.useEffect(() => {
    document.title = 'Shop Flow | Gerenciar Produtos'
  }, [])

  React.useLayoutEffect(() => {
    async function fetchCategories() {
      try {
        const categoryService = new CategoryService()
        const categories = await categoryService.findCategories()
        setCategories(prev => [{ ...prev[0] }, ...categories])
      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Problemas no servidor. Tente novamente mais tarde.')
        }
      }
    }
    fetchCategories().catch(console.error)
  }, [])

  const imageProductOnChange = React.useCallback(() => {
    if (imageRef.current?.files && imageRef.current.files.length > 0) {
      const image = imageRef.current?.files[0]
      setImageUrl(URL.createObjectURL(image))
    }
  }, [])

  const clearForm = React.useCallback(() => {
    reset()
    if (imageRef && imageRef.current) {
      imageRef.current.value = ""
    }
    setImageUrl('')
  }, [reset])


  const onSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
    setIsLoading(true)

    try {
      const category = categories.find(category => category.name === data.category)
      if (!category) {
        throw new Error('Categoria não encontrada.')
      }
      const newProduct = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: data.stock,
        categoryName: category?.name,
      }
      const productService = new ProductService(accessToken)

      const product = await productService.addProduct(newProduct)

      const image = imageRef.current?.files && imageRef.current.files.length > 0 ? imageRef.current?.files[0] : null
      if (image) {
        await productService.updateImageProduct(product.id, image)
      }

      addProduct(product)

      clearForm()
    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Ocorreu um problema.\nTente novamente mais tarde.')
      }
    }
    finally {
      setIsLoading(false)
    }
  }, [accessToken, categories, addProduct, clearForm])

  if (!isAuthencated) {
    navigate(routeNames.home)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)} ref={formRef}>

        <FormGroup>
          {!!imageUrl && (
            <FormImagePreview src={imageUrl} />
          )}
          <InputFile
            label='Selecione a imagem'
            ref={imageRef}
            onChange={imageProductOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label required>Nome</Label>
          <Input
            type="text"
            {...register("name", {
              required: {
                message: 'Esse Campo é requerido.',
                value: true
              },
              maxLength: {
                message: 'Nome deve ter no máximo 100 caracteres',
                value: 100,
              },
            })}
          />
          {!!errors.name && <ErrorItem>{errors.name.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label required>Descrição</Label>
          <TextArea
            $maxLines={4}
            {...register("description", {
              required: {
                message: 'Esse Campo é requerido.',
                value: true
              },
              maxLength: {
                message: 'Descrição deve ter no máximo 100 caracteres',
                value: 100,
              },
            })}
          />
          {!!errors.description && <ErrorItem>{errors.description.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label required>Estoque (Unidade)</Label>
          <Input
            type="number"
            defaultValue={1}
            {...register("stock", {
              required: {
                message: 'Esse Campo é requerido.',
                value: true
              },
              min: {
                message: 'Deve ter pelo menos uma unidade',
                value: 1,
              },
              max: {
                message: 'Quantidade deve ser no máximo 1.000.000 de unidades',
                value: 1_000_000,
              },
            })}
          />
          {!!errors.stock && <ErrorItem>{errors.stock.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label required>Preço</Label>
          <Controller
            name="price"
            rules={{
              required: {
                message: "Esse Campo é requerido.",
                value: true,
              },
              validate: (value) => {
                const valueNumber = parseFloat(value.replace(/\D/g, "")) / 100;
                if (valueNumber > 1_000_000) {
                  return "Preço deve ser menor que 1 Milhão.";
                }
                return true;
              },
            }}
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                value={
                  // pega o valor de string formato americano e transforma pra formato br com R$ virgulas e pontos e duas casas
                  accounting.formatMoney(parseFloat(field.value || "0"), "R$ ", 2, ".", ",")
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // pega o valor que tem R$, pontos e virgulas virgulas e 
                  // transforma pra uma string, mas formato americano
                  // Remove tudo que não for número
                  const value: string = e.target.value
                  const rawValue = value.replace(/\D/g, "");
                  // Divide por 100 para manter duas casas decimais
                  const numericValue = (Number(rawValue) / 100).toString();
                  field.onChange(numericValue);
                }}
              />
            )}
          />
          {!!errors.price && <ErrorItem>{errors.price.message}</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label required>Categoria</Label>
          <Select
            $error={false}
            defaultValue={0}
            {...register("category", {
              required: {
                message: 'Esse Campo é requerido.',
                value: true
              },
              validate: (value) => {
                if (value === 'Selecione') {
                  return 'Selecione uma categoria.'
                }
                return true;
              },
            })}
          >
            {categories.map(category => (
              <SelectOption key={category.id} value={category.name}>
                {category.name}
              </SelectOption>
            ))}
          </Select>
          {!!errors.category && <ErrorItem>{errors.category.message}</ErrorItem>}
        </FormGroup>
        {!!globalError && (
          <ErrorList>
            <ErrorItem>{globalError}</ErrorItem>
          </ErrorList>
        )}
        <FormGroupButton>
          <Button disabled={isLoading} onClick={() => onClose()} type="button" $variant='warning'>Cancelar</Button>
          <Button
            type="submit"
            disabled={isLoading}
            $variant='add'>
            {isLoading ? (
              <AiOutlineLoading />
            ) : (
              <span>
                Adicionar produto
              </span>
            )}
          </Button>
        </FormGroupButton>
      </Form>
    </Modal>
  )
}
