import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";

test("renders add item to pantry button", () => {
  render(<SearchResults />);
  const linkElement = screen.getByText(/pantry/i);
  expect(linkElement).toBeInTheDocument();
});
