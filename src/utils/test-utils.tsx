// utils/test-utils.tsx
import React from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store"; // Assuming the store is set up correctly

// Function to render components wrapped with Redux store
export function renderWithProviders(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
