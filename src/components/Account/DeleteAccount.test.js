import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import DeleteAccount from "./DeleteAccount";

test("renders delete account button to screen", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    mockUser: {
      email: "test@example.com",
      name: "John",
      surname: "Doe",
    },
  });

  render(
    <Provider store={store}>
      <DeleteAccount />
    </Provider>
  );

  const deleteButton = screen.getByTestId("deleteBtn");
  expect(deleteButton).toBeInTheDocument();
});
