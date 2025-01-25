import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { SignupPage } from "./Signup/pages/Signup"

export const routes = {
  signup: '/sign-up'
}

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
    <Route path={routes.signup} element={<SignupPage />} />
    <Route
      path="*"
      element={<Navigate to={routes.signup} replace={true} />}
    />
    </Routes>
  </BrowserRouter>
)
