import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { authService } from "../../api/authService";
import Cookies from "js-cookie";
import { signInSuccess } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

export const OtpVerification: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<any>({});
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Get the email from navigation state when component mounts
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email);
      setState(location.state);
    } else {
      // Redirect back if email isn't provided
      navigate("/register", { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      // Your OTP verification logic here
      // You can use the email state in your API call
      // await verifyOtp({ email, otp });
      const res: any = await authService.verifyOtp({
        email: email,
        otp: otp,
      });

      console.log(res.data);

      if (res.data.code === 200) {

        // setSubmitting(false);
        const resposne:any = await authService.register({
          email: email,
          username: state.username,
          password: state.password,
          organization: state.organization,
        });

        console.log(resposne.data)

        if (resposne.data.code === 200) {
          Cookies.set("auth", resposne.data.token);
          const payload: any = {
            token: resposne.data.token,
            userId: resposne.data.userId,
            role: resposne.data.role,
            orgId: resposne.data.org_id,
          };

          console.log(payload)
          dispatch(signInSuccess(payload));
          navigate("/dashboard");
          localStorage.setItem("userId", resposne.data.id);
          localStorage.setItem("auth", resposne.data.token);
          localStorage.setItem("role", resposne.data.role);
          localStorage.setItem("orgId", resposne.data.orgId);
          window.location.href = "/dashboard";
        } else {
          console.log("perror perror perror")

        }

      } else {

        console.log("error error error")

      }

      // navigate("/dashboard");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <Typography variant="h4" align="center">
          OTP Verification
        </Typography>

        <Typography variant="body1" align="center">
          We've sent a 6-digit code to {email}
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <TextField
            label="Enter OTP"
            type="text"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isVerifying || otp.length !== 6}
          >
            {isVerifying ? <LoadingSpinner size={24} /> : "Verify OTP"}
          </Button>
        </form>

        {/* <Grid container justifyContent="center">
          <Grid >
            <Typography variant="body2">
              Didn't receive code?{" "}
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                onClick={handleResendOtp}
                disabled={isVerifying}
              >
                Resend OTP
              </Button>
            </Typography>
          </Grid>
        </Grid> */}
      </Box>
    </div>
  );
};
