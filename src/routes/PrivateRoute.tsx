import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

//   console.log(children)

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};