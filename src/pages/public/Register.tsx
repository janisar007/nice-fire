import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { authService } from "../../api/authService";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Using the authService from your API layer
      await authService.orgainisationVerify({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        organization: formData.organization,
        // userType: formData.userType
      });

      // On successful registration, navigate to OTP verification
      navigate("/verify-otp", {
        state: { email: formData.email, password: formData.password,
          username: formData.username,
          organization: formData.organization},
      });
    } catch (error: any) {
      setApiError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        <Typography variant="h4" align="center" className="font-bold">
          Create Account
        </Typography>

        {apiError && (
          <Typography color="error" align="center">
            {apiError}
          </Typography>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="username"
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || "At least 8 characters"}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <TextField
            label="Organization"
            name="organization"
            fullWidth
            variant="outlined"
            value={formData.organization}
            onChange={handleChange}
            error={!!errors.organization}
            helperText={errors.organization}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner size={24} /> : "Register"}
          </Button>
        </form>

        <Typography variant="body2" align="center" className="mt-4">
          Already have an account?{" "}
          <Link href="/signin" underline="hover" className="font-medium">
            Sign in
          </Link>
        </Typography>
      </Box>
    </div>
  );
};
