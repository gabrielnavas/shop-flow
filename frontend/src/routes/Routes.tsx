import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "../pages/SignUp/SignUp"
import { SigninPage } from "../pages/SignIn/Signin"
import { ProductCatalogPage } from "../pages/ProductCatalog/ProductCatalog"
import { routeNames } from "./routes-names"
import { ManageProductPage } from "../pages/ManageProduct/ManageProduct"
import { CartPage } from "../pages/Cart/CartPage"
import { OrderPage } from "../pages/Order/Order"


export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routeNames.signup} element={<SignupPage />} />
      <Route path={routeNames.signin} element={<SigninPage />} />
      <Route path={routeNames.home} element={<ProductCatalogPage />} />
      <Route path={routeNames.manageProduct} element={<ManageProductPage />} />
      <Route path={routeNames.cart} element={<CartPage />} />
      <Route path={routeNames.orders} element={<OrderPage />} />
      <Route
        path="*"
        element={<Navigate to={routeNames.home} replace={true} />}
      />
    </Routes>
  </BrowserRouter>
)
