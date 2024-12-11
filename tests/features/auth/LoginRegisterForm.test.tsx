/* eslint-disable @typescript-eslint/no-unused-expressions */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import LoginRegisterForm from "../../../src/features/auth/LoginRegisterForm";
import AllProviders from "../../AllProviders";
import useLogin from "../../../src/features/auth/hooks/useLogin";

// Mock the useLogin hook
vi.mock("../../../src/features/auth/hooks/useLogin", () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe("LoginRegisterForm", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    mockLogin.mockReset();
  });

  const renderComponent = (mode: string) => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LoginRegisterForm mode={mode} />
      </MemoryRouter>,
      { wrapper: AllProviders }
    );

    return {
      user,
      headline: screen.getByRole("heading", { level: 2 }),
      email: screen.getByTestId("email"),
      password: screen.getByTestId("password"),
      button: screen.getByTestId("submit-button"),
      eyeIcon: screen.getByRole("button", { name: /show password/i }),
    };
  };

  it("renders login mode correctly", () => {
    const { headline, email, password, button } = renderComponent("login");
    expect(headline).toHaveTextContent(/login/i);
    expect(password).toHaveAttribute("type", "password");
    expect(email).toHaveAttribute("type", "email");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/prijavi/i);
  });

  it("renders register mode correctly", () => {
    const { headline, email, password, button } = renderComponent("register");
    expect(headline).toHaveTextContent(/nalog/i);
    expect(password).toHaveAttribute("type", "password");
    expect(email).toHaveAttribute("type", "email");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/registruj/i);
  });

  it("updates email input on change", async () => {
    const { user, email } = renderComponent("login");
    await user.type(email, "biljana.vuckovic@gmailcom");
    expect(email).toHaveValue("biljana.vuckovic@gmailcom");
  });

  it("updates password input on change", async () => {
    const { user, password } = renderComponent("login");
    await user.type(password, "12345678");
    expect(password).toHaveValue("12345678");
  });

  it("toggles password visibility when clicking the eye icon", async () => {
    const { user, password, eyeIcon } = renderComponent("login");
    expect(password).toHaveAttribute("type", "password");
    await user.click(eyeIcon);
    expect(password).toHaveAttribute("type", "text");
  });

  it("submits login form", async () => {
    const { email, password, button, user } = renderComponent("login");

    await user.type(email, "test@example.com");
    await user.type(password, "password123");
    await user.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { email: "test@example.com", password: "password123" },
        expect.any(Object)
      );
    });
  });

  it.only("submits login form, success case", async () => {
    (useLogin as jest.Mock).mockReturnValue({
      status: "success",
      mutate: mockLogin,
      error: { message: "Welcome" },
    });

    const { email, password, button, user } = renderComponent("login");
    await user.type(email, "test@example.com");
    await user.type(password, "password123");
    await user.click(button);
  });

  it("submits login form, error case", async () => {
    (useLogin as jest.Mock).mockReturnValue({
      status: "error",
      mutate: mockLogin,
      error: { message: "Invalid credentials" },
    });
    const { password, button, user } = renderComponent("login");
    //await user.type(email, "test@example.com");
    await user.type(password, "password123");
    await user.click(button);

    const authNotification = await screen.findByTestId("auth-notification");

    expect(authNotification).toBeInTheDocument();
    screen.debug();
  });
});
