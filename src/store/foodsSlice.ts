import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Restaurant = {
	id: string;
	name: string;
	logo: string;
	status: "Open Now" | "Closed";
};

export type Food = {
	id: string;
	name: string;
	rating: number;
	image: string;
	restaurant?: Restaurant | null;
};

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type FoodsState = {
	items: Food[];
	status: RequestStatus;
	error: string | null;
	searchTerm: string;
};

const initialState: FoodsState = {
	items: [],
	status: "idle",
	error: null,
	searchTerm: "",
};

const foodsSlice = createSlice({
	name: "foods",
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Food[]>) {
			state.items = action.payload;
		},
		setStatus(state, action: PayloadAction<RequestStatus>) {
			state.status = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
		setSearchTerm(state, action: PayloadAction<string>) {
			state.searchTerm = action.payload;
		},
		reset(state) {
			state.items = [];
			state.status = "idle";
			state.error = null;
			state.searchTerm = "";
		},
	},
});

export const { setItems, setStatus, setError, setSearchTerm, reset } = foodsSlice.actions;
export default foodsSlice.reducer;


