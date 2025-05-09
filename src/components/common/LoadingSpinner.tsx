import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 40, 
  color = "inherit" 
}) => {
  return (
    <div className="flex justify-center items-center">
      <CircularProgress size={size} style={{ color }} />
    </div>
  );
};