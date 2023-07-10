import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useNavigate } from "react-router-dom";
import MyPantry from "./MyPantry";

// Mock the redux store
const mockStore = configureStore([]);

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("MyPantry component", () => {
  let store;
  let navigate;

  beforeEach(() => {
    // Initialize the redux store
    store = mockStore({
      userPreferences: {
        vegan: true,
        vegetarian: false,
        glutenFree: true,
      },
      pantryItems: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
      ],
    });

    // Reset the navigate mock before each test
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  test("renders MyPantry component correctly", () => {
    render(
      <Provider store={store}>
        <MyPantry
          setSuggestions={jest.fn()}
          setPantryItems={jest.fn()}
          setPantryItemsChanged={jest.fn()}
          userPreferences={store.getState().userPreferences}
          pantryItems={store.getState().pantryItems}
        />
      </Provider>
    );

    // Verify the presence of certain elements
    expect(screen.getByText("My Pantry Items:")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test('calls onUsePantry when "Search for recipes" button is clicked', async () => {
    render(
      <Provider store={store}>
        <MyPantry
          setSuggestions={jest.fn()}
          setPantryItems={jest.fn()}
          setPantryItemsChanged={jest.fn()}
          userPreferences={store.getState().userPreferences}
          pantryItems={store.getState().pantryItems}
        />
      </Provider>
    );

    // Simulate clicking the "Search for recipes" button
    const searchButton = screen.getByTestId("searchButton");
    fireEvent.click(searchButton);

    // Verify that onUsePantry has been called by checking that useNavigate call is reached
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith("/recipe-search");
    });
  });
});
