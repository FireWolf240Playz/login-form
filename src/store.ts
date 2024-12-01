import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userOperations";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
