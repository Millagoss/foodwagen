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
	fireEvent.click(screen.getByRole("button", { name: /delete food/i }));
	expect(store.getState().ui.modalDeleteId).toBe("1");
});



