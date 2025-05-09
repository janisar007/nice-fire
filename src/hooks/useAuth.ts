import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { signOutUser } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);

  const logout = () => {
    dispatch(signOutUser());
  };

  return { role, logout };
};
