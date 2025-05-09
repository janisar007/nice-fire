import { baseService } from "./baseService";

export const authService = {
  signIn: (credentials: { email: string; password: string }) => {
    return baseService.post("/users/login", credentials);
  },
  signOut: () => {
    return baseService.post("/auth/signout");
  },
  register: (userData: {
    email: string;
    password: string;
    username: string;
    organization: string;
  }) => {
    return baseService.post("/users/register", userData);
  },
  orgainisationVerify: (userData: {
    email: string;
    password: string;
    username: string;
    organization: string;
  }) => {
    return baseService.post("/users/send/otp/", userData);
  },
  verifyOtp: (otpData: { email: string; otp: string }) => {
    return baseService.post("/users/verify/otp", otpData);
  },
};