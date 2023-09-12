import React from "react";
import { render, screen } from "@testing-library/react";
import PantrySearch from "./PantrySearch";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Mock the redux store
const mockStore = configureStore([]);

describe("PantrySearch component", () => {
  let store;

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
  });
  test("pantry search component renders with heading and sub-heading", () => {
    render(
      <Provider store={store}>
        <PantrySearch />
      </Provider>
    );

    const heading = screen.getByText(/Pantry/);
    expect(heading).toBeInTheDocument();

    const subHeading = screen.getByText(
      /Search for items to add to your pantry:/
    );
    expect(subHeading).toBeInTheDocument();
  });
});
