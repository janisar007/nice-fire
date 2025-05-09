import type { RouteConfig } from "../types/routes";
import { Dashboard } from "../pages/private/Dashboard";

export const privateRoutes: RouteConfig[] = [
  {
    id: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
];