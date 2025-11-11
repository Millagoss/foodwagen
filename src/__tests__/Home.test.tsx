import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import Home from "../app/page";
import server from "../test/server";
import { http, HttpResponse } from "msw";

test("mocked GET success displays foods", async () => {
  server.use(
    http.get("/Food", () =>
      HttpResponse.json([
        {
          id: "a1",
          name: "Sushi",
          rating: 4.7,
          image: "https://picsum.photos/400/300?1",
          restaurant: { name: "Tokyo Dine", logo: "", status: "Open Now" },
        },
      ]),
    ),
  );
  render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  expect(await screen.findByText(/Sushi/)).toBeInTheDocument();
});
