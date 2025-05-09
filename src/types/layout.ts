import type { SvgIconComponent } from "@mui/icons-material";

export interface NavItem {
  id: string;
  name: string;
  icon?: SvgIconComponent; // Make optional for non-sidebar pages
  component: any;
  path: string;
  showInSidebar: boolean; // Control visibility in sidebar
}

export interface NavListItemProps {
    item: NavItem;
    open: boolean;
    active?: boolean;
    onClick: () => void;
  }