import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "../pages/SignUp/SignUp"
import { SigninPage } from "../pages/SignIn/Signin"
import { ProductCatalogPage } from "../pages/ProductCatalog/ProductCatalog"
import { routeNames } from "./routes-names"


export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routeNames.signup} element={<SignupPage />} />
      <Route path={routeNames.signin} element={<SigninPage />} />
      <Route path={routeNames.home} element={<ProductCatalogPage />} />
      <Route path={routeNames.orders} element={<div>order page</div>} />
      <Route
        path="*"
        element={<Navigate to={routeNames.home} replace={true} />}
      />
    </Routes>
  </BrowserRouter>
)
