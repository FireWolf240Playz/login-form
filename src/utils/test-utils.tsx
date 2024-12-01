// utils/test-utils.tsx
import React from "react";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<Provider store={store}>{ui}</Provider>);
}
