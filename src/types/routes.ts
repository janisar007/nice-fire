export interface RouteConfig {
    id: string;
    path: string;
    component: React.ComponentType;
    exact?: boolean;
  }