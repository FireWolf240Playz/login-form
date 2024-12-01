import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { logInUser } from "./userThunks";

interface UserState {
  username: string;
  status: "sign-in" | "loading" | "signed-in" | "failed";
  error: string | null;
}

export const initialState: UserState = {
  username: "",
  status: "sign-in",
  error: null,
};

export const logOutUser = createAsyncThunk("user/logOutUser", async () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<{ username: string }>) => {
          state.status = "signed-in";
          state.username = action.payload.username;
          state.error = null;
        },
      )
      .addCase(logInUser.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(logOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutUser.fulfilled, () => initialState)
      .addCase(logOutUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
