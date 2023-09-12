import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import Preferences from "./Preferences";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("Preferences", () => {
  test("renders checkboxes and update button", () => {
    const mockUser = {
      preferences: {
        vegan: true,
        vegetarian: false,
        glutenFree: true,
      },
    };
    const mockToken = "mockToken";

    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        token: mockToken,
      })
    );

    render(<Preferences user={mockUser} />);

    // Verify checkboxes
    const veganCheckbox = screen.getByLabelText("Vegan");
    const vegetarianCheckbox = screen.getByLabelText("Vegetarian");
    const glutenFreeCheckbox = screen.getByLabelText("Gluten-Free");

    expect(veganCheckbox.checked).toBe(true);
    expect(vegetarianCheckbox.checked).toBe(false);
    expect(glutenFreeCheckbox.checked).toBe(true);

    // Simulate checkbox input
    fireEvent.click(vegetarianCheckbox);
    fireEvent.click(glutenFreeCheckbox);

    expect(veganCheckbox.checked).toBe(true);
    expect(vegetarianCheckbox.checked).toBe(true);
    expect(glutenFreeCheckbox.checked).toBe(false);

    // Verify update button
    const updateButton = screen.getByText("Update");
    expect(updateButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(updateButton);

    // Assert that the useSelector hook was called with the correct arguments
    expect(useSelector).toHaveBeenCalledWith(expect.any(Function));

    // Other assertions related to API call can be added based on the specific implementation
  });
});
