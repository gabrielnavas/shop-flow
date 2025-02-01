import { Button } from "../../components/ui/Button"
import { Form } from "../../components/ui/Form"
import { FormGroup } from "../../components/ui/FormGroup"
import { Label } from "../../components/ui/Label"
import Modal from "../../components/ui/Modal"
import React from "react"
import { Select } from "../../components/ui/Select"
import { SelectOption } from "../../components/ui/SelectOption"
import { FormImagePreview } from "../../components/ui/FormImagePreview"
import { FormGroupButton } from "../../components/ui/FormGroupButton"
import { TextArea } from "../../components/ui/TextArea"
import { Input } from "../../components/ui/Input"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ProductService } from "../../services/product-service"
import { Rows } from "../../components/ui/Rows"
import { Row } from "../../components/ui/Row"
import { ErrorList } from "../../components/ui/ErrorList"
import { ErrorItem } from "../../components/ui/ErrorItem"
import { AiOutlineLoading } from "react-icons/ai"
import accounting from "accounting"

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

  const categories = [{
    id: 1,
    name: 'Cozinha',
  }, {
    id: 2,
    name: 'Auto',
  },]

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const imageProductOnChange = React.useCallback(() => {
    if (imageRef.current?.files && imageRef.current.files.length > 0) {
      const image = imageRef.current?.files[0]
      setImageUrl(URL.createObjectURL(image))
    }
  }, [])


  const onSubmit: SubmitHandler<Inputs> = React.useCallback(async (data) => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    setIsLoading(true)

    try {
      const productService = new ProductService()
      await productService.addProduct(data.name)
      console.log(data);
      

    } catch (err) {
      if (err instanceof Error) {
        setGlobalError(err.message)
      } else {
        setGlobalError('Ocorreu um problema.\nTente novamente mais tarde.')
      }

      handleScrollToTop()
    }
    finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {!!globalError && (
          <Rows>
            <Row>
              <ErrorList>
                <ErrorItem>{globalError}</ErrorItem>
              </ErrorList>
            </Row>
          </Rows>
        )}
        <FormGroup>
          <Label>Imagem</Label>
          {!!imageUrl && (
            <FormImagePreview src={imageUrl} />
          )}
          <Input type="file" ref={imageRef} onChange={imageProductOnChange} />
          {imageRef.current?.files?.length === 0 && <ErrorItem>Selecione uma imagem</ErrorItem>}
        </FormGroup>
        <FormGroup>
          <Label>Nome</Label>
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
          <Label>Descrição</Label>
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
          <Label>Estoque</Label>
          <Input
            type="number"
            {...register("stock", {
              required: {
                message: 'Esse Campo é requerido.',
                value: true
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
          <Label>Preço</Label>
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
          <Label>Categoria</Label>
          <Select $error={false}>
            {categories.map(category => (
              <SelectOption key={category.id}>{category.name}</SelectOption>
            ))}
          </Select>
          {!!errors.category && <ErrorItem>{errors.category.message}</ErrorItem>}
        </FormGroup>
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
