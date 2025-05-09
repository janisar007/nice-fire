import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="text-center p-8 max-w-md">
        <ErrorOutlineIcon 
          style={{ fontSize: 80, color: "#ef4444" }} 
          className="mx-auto mb-4"
        />
        <Typography variant="h3" gutterBottom className="font-bold">
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph className="mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          className="mt-4"
        >
          Go to Home
        </Button>
      </Box>
    </div>
  );
};