import { render, screen } from "@testing-library/react";
import AccountInfo from "./AccountInfo";

test("renders username to screen", () => {
  render(<AccountInfo />);
  const linkElement = screen.getByText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});
