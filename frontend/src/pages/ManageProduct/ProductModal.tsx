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
import { Category, Product } from "../../services/entities"
import { Modal } from "../../components/ui/Modal"
import { midiaUrldefaults, MidiaService } from "../../services/midia-service"

type Props = {
  isOpenModal: boolean
  onClose: () => void
  product?: Product | undefined
}

type Inputs = {
  id: number
  name: string
  description: string
  stock: number
  price: string
  category: string
}

// TODO: Limitar o tamanho da imagem que é exibida no modal, maximo e minimo
export const ProductModal = ({ product, isOpenModal, onClose }: Props) => {
  const [globalError, setGlobalError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const [imageUrl, setImageUrl] = React.useState('')
  const imageRef = React.useRef<HTMLInputElement | null>(null)
  const [hasFile, setHasFile] = React.useState<boolean>(false)

  const formRef = React.useRef<HTMLFormElement | null>(null)

  const defaultCategory = React.useMemo(() => ({ id: 0, name: 'Selecione' }), [])
  const [categories, setCategories] = React.useState<Category[]>([defaultCategory])

  const { accessToken, isAuthencated } = React.useContext(AuthContext) as AuthContextType
  const {
    addProduct,
    updateProduct
  } = React.useContext(ProductContext) as ProductContextType

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: product === undefined ? {
      id: 0,
      name: '',
      description: '',
      price: '',
      category: '',
      stock: 10
    } : {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category.name,
      stock: product.stock
    }
  })

  const onClearImage = React.useCallback(() => {
    if (imageRef && imageRef.current) {
      imageRef.current.value = ""
    }
    setImageUrl(midiaUrldefaults.product)
  }, [])

  const clearForm = React.useCallback(() => {
    reset()
    onClearImage()
  }, [reset, onClearImage])

  const initForm = React.useCallback((product: Product) => {
    setValue('name', product.name)
    setValue('description', product.description)
    setValue('stock', product.stock)
    setValue('price', product.price.toFixed(2))
    setValue('category', product.category.name)
  }, [setValue])

  React.useEffect(() => {
    if(product) {
      initForm(product)
    } else {
      initForm({
        id: 0,
        name: '',
        description: '',
        price: 0,
        category: defaultCategory,
        stock: 10,
        createdAt: new Date(),
        imageUrl: '',
      })
    }
  }, [defaultCategory, product, initForm])

  React.useEffect(() => {
    async function setImageUrlFromProduct() {
      if (!product) {
        return
      }

      if (product.imageUrl) {
        const midiaService = new MidiaService()

        const imageUrl = midiaService.getUrl(product.imageUrl)
        setImageUrl(imageUrl)

        const imageUrlSplited = product.imageUrl.split('/')
        const fileName = imageUrlSplited[imageUrlSplited.length - 1]

        try {

          const blob: Blob = await midiaService.fetchImage(imageUrl)
          const file = new File([blob], fileName, { type: blob.type });
          if (imageRef?.current && imageRef?.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageRef.current.files = dataTransfer.files
          }

        } catch (err) {
          console.error(err);
        }
      } else {
        setImageUrl(midiaUrldefaults.product)
      }
    }

    function setImageFromRef() {
      let imageUrl = ''
      let hasFile = false
      if (imageRef.current?.files && imageRef.current.files.length > 0) {
        const image = imageRef.current!.files![0]
        imageUrl = URL.createObjectURL(image)
        hasFile = true
      } else {
        imageUrl = midiaUrldefaults.product
      }
      setImageUrl(imageUrl)
      setHasFile(hasFile)
    }

    if (product) {
      setImageUrlFromProduct()
    } else {
      setImageFromRef()
    }
  }, [product, imageRef])

  React.useEffect(() => {
    async function fetchCategoriesAndSetSelectCategory() {
      if (!product) {
        return
      }

      try {
        const categoryService = new CategoryService()
        const categories = await categoryService.findCategories()

        setCategories(prev => [{ ...prev[0] }, ...categories])

        const category = categories.find(category => category.name === product.category.name)
        if (!category) {
          throw new Error('Categoria do produto não disponível na tela.')
        }
        setValue('category', category.name)

      } catch (err) {
        if (err instanceof Error) {
          setGlobalError(err.message)
        } else {
          setGlobalError('Problemas no servidor. Tente novamente mais tarde.')
        }
      }
    }

    async function fetchInititalCategories() {
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
    if (product) {
      fetchCategoriesAndSetSelectCategory().catch(console.error)
    } else {
      fetchInititalCategories().catch(console.error)
    }
  }, [product, setValue])


  const imageProductOnChange = React.useCallback(() => {
    if (imageRef.current && imageRef.current.files && imageRef.current.files.length > 0) {
      const image = imageRef.current.files[0]
      setImageUrl(URL.createObjectURL(image))
      setHasFile(true)
    } else {
      setImageUrl(midiaUrldefaults.product)
      setHasFile(false)
    }
  }, [imageRef])


  const addNewProductOnSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
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

      const image = hasFile ? imageRef.current!.files![0] : null
      if (image) {
        const { url } = await productService.updateImageProduct(product.id, image)
        product.imageUrl = url
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
  }, [accessToken, categories, addProduct, clearForm, hasFile, imageRef])


  const updateProductOnSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
    if (!product) {
      return
    }

    setIsLoading(true)

    try {
      const productService = new ProductService(accessToken)

      const category = categories.find(category => category.name === data.category)
      if (!category) {
        throw new Error('Categoria não encontrada.')
      }

      const image = hasFile
        ? imageRef.current!.files![0]
        : null

      const payload = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryName: category.name,
      }

      const productUpdated = await productService.updateProduct(data.id!, payload)

      if (image) {
        productService.updateImageProduct(data.id!, image)
          .then(({ url }) => {
            product.name = productUpdated.name
            product.description = productUpdated.description
            product.price = productUpdated.price
            product.stock = productUpdated.stock
            product.updatedAt = productUpdated.updatedAt
            product.imageUrl = url
            updateProduct(data.id!, product)
            clearForm()
            onClose()
          })
      } else {
        productUpdated.imageUrl = ''
        updateProduct(data.id!, productUpdated)
        clearForm()
        onClose()
      }

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
  }, [accessToken, categories, clearForm, updateProduct, imageRef, onClose, product, hasFile])



  if (!isAuthencated) {
    navigate(routeNames.home)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}>
      <Form
        onSubmit={handleSubmit(product
          ? updateProductOnSubmit
          : addNewProductOnSubmit)}
        ref={formRef}>
        <FormGroup>
          <FormImagePreview src={imageUrl} />
          <InputFile
            label='Selecione a imagem'
            ref={imageRef}
            onChange={imageProductOnChange}
            onClearFile={hasFile ? () => onClearImage() : undefined}
          />
        </FormGroup>
        <FormGroup>
          <Label required>Nome</Label>
          <Input
            type="text"
            placeholder="Nome único para o produto"
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
            placeholder="Descreva o produto, suas características..."
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
          {isLoading ? (
            <AiOutlineLoading />
          ) : (
            <>
              <Button
                disabled={isLoading}
                onClick={() => onClose()}
                type="button" $variant='warning'>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                $variant='add'>

                <span>
                  {product ? 'Atualizar produto' : 'Adicionar produto'}
                </span>

              </Button>
            </>
          )}
        </FormGroupButton>
      </Form>
    </Modal>
  )
}
