import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "./Auth/pages/Signup"
import { SigninPage } from "./Auth/pages/Signin"

export const routes = {
  signup: '/sign-up',
  signin: '/sign-in',
  home: '/home',
}

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.signup} element={<SignupPage />} />
      <Route path={routes.signin} element={<SigninPage />} />
      <Route path={routes.home} element={<div>home</div>} />
      <Route
        path="*"
        element={<Navigate to={routes.signup} replace={true} />}
      />
    </Routes>
  </BrowserRouter>
)
