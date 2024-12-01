import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../utils/test-utils";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom";

global.fetch = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form with initial state", () => {
    renderWithProviders(<LoginForm />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log in now/i }),
    ).toBeInTheDocument();
  });

  test("displays validation errors when fields are empty", async () => {
    renderWithProviders(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    expect(
      await screen.findByText("This field is required"),
    ).toBeInTheDocument();
  });

  test("displays an error for invalid email format", async () => {
    renderWithProviders(<LoginForm />);

    // Enter invalid email
    await userEvent.type(
      screen.getByPlaceholderText("Username"),
      "invalid-email",
    );

    await userEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    expect(
      await screen.findByText("Please enter a valid email address"),
    ).toBeInTheDocument();
  });

  test("submits the form and calls logInUser on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testuser" }),
    });

    renderWithProviders(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText("Username"),
      "a.yordanow67@gmail.com",
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), "pass1234");
    await userEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/👋Hi again, a.yordanow67@gmail.com/i),
      ).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith(
      "/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "a.yordanow67@gmail.com",
          password: "pass1234",
        }),
      }),
    );
  });

  test("displays error if login fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    renderWithProviders(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText("Username"),
      "testuser@example.com",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "wrongpassword",
    );
    await userEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
