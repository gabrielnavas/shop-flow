import React from "react";
import { CartContext, CartContextType } from "../contexts/CartContext/CartContext";

export const useCart = () => React.useContext(CartContext) as CartContextType