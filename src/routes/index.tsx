import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { SignIn } from "../pages/public/SignIn"; 
import { PrivateRoute } from "./PrivateRoute";
import { navItems } from "../layouts/navItems";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        {navItems.map((item) => {

          const Comp = item.component
          
          return (
          <Route
            key={item.id}
            path={item.path.startsWith('/') ? item.path.substring(1) : item.path}
            element={<Comp/>}
          />
        )})}
      </Route>
    </Routes>
  );
};