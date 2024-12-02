// utils/test-utils.tsx
import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userOperations";
import type { RootState } from "../store";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    ...renderOptions
  }: { preloadedState?: RootState } & RenderOptions = {},
) {
  const customStore = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState,
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={customStore}>{children}</Provider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
