import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginPayload {
  username: string;
  password: string;
}

export const logInUser = createAsyncThunk(
  "user/logInUser",
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Network error");
    }
  },
);
