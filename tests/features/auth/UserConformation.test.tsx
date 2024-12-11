import { render, screen } from "@testing-library/react";

import useVerifyAccount from "../../../src/features/auth/hooks/useVerifyAccount";
import UserConformation from "../../../src/features/auth/UserConformation";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AllProviders from "../../AllProviders";

vi.mock("../../src/features/auth/hooks/useVerifyAccount", () => ({
  useVerifyAccount: vi.fn().mockReturnValue({
    data: { message: "Verification successful" },
    error: null,
  }),
}));

describe("UserConformation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.only("shows a success message when data is available", () => {
    render(
      <MemoryRouter>
        <UserConformation />
      </MemoryRouter>,
      { wrapper: AllProviders }
    );
    screen.debug();

    expect(screen.getByText(/Verification successful/i)).toBeInTheDocument();
  });

  it("shows an error message when there is an error", () => {
    (useVerifyAccount as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "An error occurred during verification" },
    });

    render(<UserConformation />);

    expect(
      screen.getByText("An error occurred during verification")
    ).toBeInTheDocument();
  });

  it("shows a loading message when neither data nor error is present", () => {
    (useVerifyAccount as jest.Mock).mockReturnValue({
      data: null,
      error: null,
    });

    render(<UserConformation />);

    expect(screen.getByText("Verifying your account...")).toBeInTheDocument();
  });
});
