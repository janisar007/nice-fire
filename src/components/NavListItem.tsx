import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import type { NavItem } from "../types/layout";
import { useLocation } from "react-router-dom";

interface NavListItemProps {
  item: NavItem;
  open: boolean;
  onClick: () => void;
}

export const NavListItem: React.FC<NavListItemProps> = ({
  item,
  open,
  onClick,
}) => {
  const location = useLocation();
  const theme = useTheme();
  const isActive = location.pathname === item.path;

  return (
    <Tooltip title={!open ? item.name : ""} placement="right">
      <ListItem
        onClick={onClick}
        sx={{
          backgroundColor: isActive ? theme.palette.action.selected : "inherit",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon
          sx={{ color: isActive ? theme.palette.primary.main : "inherit" }}
        >
          <item.icon />
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            fontWeight: isActive ? "medium" : "normal",
          }}
        />
      </ListItem>
    </Tooltip>
  );
};
