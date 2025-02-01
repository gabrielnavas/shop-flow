import { Product } from "../../services/product-service";

export type ProductCart = {
  product: Product;
  quantity: number
}