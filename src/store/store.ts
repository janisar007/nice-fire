import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializationComplete } from "./slices/authSlice"; 
import { getLocalStorageItem } from "../utils/storage";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = (dispatch: AppDispatch, getState: () => RootState) => void;

const preloadedState = {
  auth: {
    isAuthenticated: !!getLocalStorageItem("authToken"),
    userId: getLocalStorageItem("userId"),
    authToken: getLocalStorageItem("authToken"),
    role: getLocalStorageItem("role"),
    orgId: getLocalStorageItem("orgId"),
    loading: false,
    initializing: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

store.dispatch(initializationComplete());

export default store;