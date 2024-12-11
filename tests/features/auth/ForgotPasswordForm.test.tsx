import { render, screen, waitFor } from "@testing-library/react";
import useForgotPassword from "../../../src/features/auth/hooks/useForgotPassword";
import ForgotPasswordForm from "../../../src/features/auth/ForgotPasswordForm";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../../../src/features/auth/hooks/useForgotPassword", () => ({
  default: vi.fn(),
}));

describe("ForgotPasswordForm", () => {
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useForgotPassword as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: "idle",
      error: null,
      data: null,
    });
  });

  const renderComponent = () => {
    render(<ForgotPasswordForm />);

    return {
      emailInput: screen.queryByPlaceholderText("Email"),
      submitButton: screen.queryByRole("button", {
        name: /novu lozinku/i,
      }),
      notification: screen.queryByTestId("auth-notification"),
      user: userEvent.setup(),
    };
  };

  it("renders the form correctly", () => {
    const { emailInput, submitButton } = renderComponent();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("calls the mutate function with the correct email on form submission", async () => {
    const { emailInput, submitButton, user } = renderComponent();

    await user.type(emailInput!, "test@example.com");
    await user.click(submitButton!);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { email: "test@example.com" },
        expect.any(Object)
      );
    });

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it("shows an success message when the mutation succeds", async () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: "success", // Keep the status as idle during the test
      error: { message: "Success" },
      data: { message: "Success" },
    });
    const { notification } = renderComponent();
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent("Success");
  });

  it("shows an error message when the mutation fails", async () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      status: "error", // Keep the status as idle during the test
      error: { message: "Failed to reset password" },
      data: null,
    });
    const { notification, emailInput } = renderComponent();
    expect(emailInput).toHaveValue("");
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveTextContent("Failed to reset password");
  });
});
