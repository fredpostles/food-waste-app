import { render, screen } from "@testing-library/react";
import AccountInfo from "./AccountInfo";

test("renders email to screen", () => {
  render(<AccountInfo />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
