import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "./Auth/pages/Signup"
import { SigninPage } from "./Auth/pages/Signin"
import { ProductCatalogPage } from "./Product/pages/ProductCatalog"
import { AuthProvider } from "./contexts/auth"

export const routes = {
  signup: '/sign-up',
  signin: '/sign-in',
  home: '/home',
}

export const MyRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.signup} element={<SignupPage />} />
        <Route path={routes.signin} element={<SigninPage />} />
        <Route path={routes.home} element={<ProductCatalogPage />} />
        <Route
          path="*"
          element={<Navigate to={routes.signin} replace={true} />}
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
)
