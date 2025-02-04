import { Product } from "../../services/entities";

export type ProductCart = {
  product: Product
  quantity: number
  createdAt: Date
}