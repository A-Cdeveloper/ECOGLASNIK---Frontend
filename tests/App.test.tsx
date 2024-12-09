import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { describe } from "vitest";

describe("App", () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
