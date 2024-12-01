import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils"; // your custom render function
import LoginForm from "./LoginForm";

import "@testing-library/jest-dom";

// Mocking the global fetch function
global.fetch = jest.fn();

// Tests for the LoginForm component
describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks between tests
  });

  test("renders the login form with initial state", () => {
    renderWithProviders(<LoginForm />);

    // Ensure the form elements are rendered
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Log in now/i }),
    ).toBeInTheDocument();
  });

  test("displays validation errors when fields are empty", async () => {
    renderWithProviders(<LoginForm />);

    // Try to submit the form without filling in fields
    fireEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    // Check if validation error messages are shown
    expect(
      await screen.findByText("This field is required"),
    ).toBeInTheDocument();
  });

  test("displays an error for invalid email format", async () => {
    renderWithProviders(<LoginForm />);

    // Enter invalid email
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "invalid-email" },
    });

    // Try submitting the form
    fireEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    // Check for the invalid email error message
    expect(
      await screen.findByText("Please enter a valid email address"),
    ).toBeInTheDocument();
  });

  test("submits the form and calls logInUser on success", async () => {
    // Mock the fetch call to simulate a successful login response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testuser" }),
    });

    renderWithProviders(<LoginForm />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    // Wait for the login to succeed and check for the welcome message
    await waitFor(() => {
      expect(screen.getByText(/Welcome, testuser/i)).toBeInTheDocument();
    });

    // Ensure that fetch was called with the correct URL and method
    expect(fetch).toHaveBeenCalledWith(
      "/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          username: "testuser@example.com",
          password: "password123",
        }),
      }),
    );
  });

  test("displays error if login fails", async () => {
    // Mock the fetch call to simulate a failed login response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid credentials" }),
    });

    renderWithProviders(<LoginForm />);

    // Fill in the form with valid data
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Log in now/i }));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
