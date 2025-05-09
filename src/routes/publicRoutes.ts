import type { RouteConfig } from "../types/routes";
import { SignIn } from "../pages/public/SignIn";
import { Register } from "../pages/public/Register";
import { OtpVerification } from "../pages/public/OtpVerification";

export const publicRoutes: RouteConfig[] = [
  {
    id: "signin",
    path: "/signin",
    component: SignIn,
    exact: true,
  },
  {
    id: "register",
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    id: "otp-verification",
    path: "/verify-otp",
    component: OtpVerification,
    exact: true,
  },
];