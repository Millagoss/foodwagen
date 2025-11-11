import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import FoodCard from "../components/FoodCard";

const sample = {
  id: "1",
  name: "Burger",
  rating: 4.5,
  image: "https://picsum.photos/400/300",
  restaurant: { name: "BBQ Place", logo: "", status: "Open Now" as const },
};

test("renders FoodCard content", () => {
  render(
    <Provider store={store}>
      <FoodCard food={sample} />
    </Provider>,
  );
  expect(screen.getByText(/Burger/)).toBeInTheDocument();
  expect(screen.getByText(/4\.5/)).toBeInTheDocument();
});

test("delete button click sets modalDeleteId", () => {
  render(
    <Provider store={store}>
      <FoodCard food={sample} />
    </Provider>,
  );
  // First click the menu button to open the dropdown
  const menuButton = screen.getByRole("button", { name: /open actions/i });
  fireEvent.click(menuButton);
  // Then click the delete button - query by data-test-id attribute
  const deleteButton = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(deleteButton);
  expect(store.getState().ui.modalDeleteId).toBe("1");
});

test("edit button click sets modalEditId", () => {
  render(
    <Provider store={store}>
      <FoodCard food={sample} />
    </Provider>,
  );
  // First click the menu button to open the dropdown
  const menuButton = screen.getByRole("button", { name: /open actions/i });
  fireEvent.click(menuButton);
  // Then click the edit button - query by role
  const editButton = screen.getByRole("button", { name: /edit/i });
  fireEvent.click(editButton);
  expect(store.getState().ui.modalEditId).toBe("1");
});
