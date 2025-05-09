import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Toolbar,
  List,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  CssBaseline,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  // Add more icons as needed
} from "@mui/icons-material";
import { AppBar, Drawer, DrawerHeader } from "./LayoutStyledComponents";
import { useAuth } from "../hooks/useAuth";
import { navItems } from "./navItems";
import { NavListItem } from "../components/NavListItem";

export const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const location = useLocation();

  // Helper function to check if a path matches the current route
  const isActive = (path: string) => {
    // Exact match for dashboard
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    // Partial match for other routes
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#2AAA8A" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Bid Fire
          </Typography>

          {/* User Profile */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {role}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <Avatar alt={role} src={""} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            height: "100vh",
            overflowY: "auto",
            width: open ? 240 : 56,
            transition: "width 0.3s ease",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ overflowY: "auto" }} className="cursor-pointer">
          {navItems
            .filter((item) => item.showInSidebar)
            .map((item) => (
              <NavListItem
                key={item.id}
                item={item}
                open={open}
                active={() => isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          //   overflow: "hidden",
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            flex: 1,
            // overflowY: "auto",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
