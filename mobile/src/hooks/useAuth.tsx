import React from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext/AuthContext";

export const useAuth = () => React.useContext(AuthContext) as AuthContextType