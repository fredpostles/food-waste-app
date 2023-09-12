import { render, screen } from "@testing-library/react";
import AccountInfo from "./AccountInfo";

test("renders email to screen", () => {
  const mockUser = {
    email: "test@example.com",
    name: "John",
    surname: "Doe",
  };

  render(<AccountInfo user={mockUser} />);

  const emailLabel = screen.getByTestId("emailLabel");
  expect(emailLabel).toBeInTheDocument();

  const nameLabel = screen.getByTestId("nameLabel");
  expect(nameLabel).toBeInTheDocument();

  const surnameLabel = screen.getByTestId("surnameLabel");
  expect(surnameLabel).toBeInTheDocument();

  const emailInput = screen.getByPlaceholderText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput.value).toBe("test@example.com");

  const nameInput = screen.getByPlaceholderText(/First name/i);
  expect(nameInput).toBeInTheDocument();
  expect(nameInput.value).toBe("John");

  const surnameInput = screen.getByPlaceholderText(/Surname/i);
  expect(surnameInput).toBeInTheDocument();
  expect(surnameInput.value).toBe("Doe");
});
