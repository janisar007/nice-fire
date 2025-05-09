import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../store/slices/authSlice";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error }: any = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(signIn({ email, password }));

      setTimeout(() => {
        navigate("/dashboard");
        
      }, 1000);

      
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <Typography variant="h4" align="center">
          Sign In
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size={24} /> : "Sign In"}
          </Button>
        </form>
        <Typography align="center">
          Don't have an account?{" "}
          <Link href="/register" underline="hover">
            Register
          </Link>
        </Typography>
      </Box>
    </div>
  );
};
