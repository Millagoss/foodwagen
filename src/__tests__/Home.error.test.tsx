import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import Home from "../app/page";
import server from "../test/server";
import { http, HttpResponse } from "msw";

test("displays error message when API request fails", async () => {
  server.use(
    http.get("https://6852821e0594059b23cdd834.mockapi.io/Food", () =>
      HttpResponse.error(),
    ),
    http.get("https://6852821e0594059b23cdd834.mockapi.io/Food*", () =>
      HttpResponse.error(),
    ),
  );

  render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  await waitFor(() => {
    // Check if error is set in the store after API failure
    const state = store.getState();
    expect(state.foods.error).toBeTruthy();
  }, { timeout: 3000 });
});

