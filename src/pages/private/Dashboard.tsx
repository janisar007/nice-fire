import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../store/slices/authSlice";
import type { RootState } from "../../store/store";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    navigate("/signin");
    dispatch(signOutUser());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Box className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome, User {userId}!
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    </div>
  );
};
