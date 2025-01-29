import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "./auth/pages/Signup"
import { SigninPage } from "./auth/pages/Signin"
import { ProductCatalogPage } from "./product/pages/ProductCatalog"
import { AppProviders } from "./AppProviders"

export const routes = {
  signup: '/sign-up',
  signin: '/sign-in',
  home: '/home',
  orders: '/orders',
}

export const MyRoutes = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        <Route path={routes.signup} element={<SignupPage />} />
        <Route path={routes.signin} element={<SigninPage />} />
        <Route path={routes.home} element={<ProductCatalogPage />} />
        <Route path={routes.orders} element={<div>order page</div>} />
        <Route
          path="*"
          element={<Navigate to={routes.home} replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  </AppProviders>
)
