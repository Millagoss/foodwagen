import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "../types/food";
import { createFood as apiCreate, deleteFood as apiDelete, listFoods as apiList, searchFoods as apiSearch, updateFood as apiUpdate } from "../lib/api/food";

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

export const fetchFoods = createAsyncThunk<Food[], string | undefined>(
	"foods/fetch",
	async (term) => {
		const t = term?.trim();
		if (t) return await apiSearch(t);
		return await apiList();
	},
);

export const createFoodThunk = createAsyncThunk<Food, Parameters<typeof apiCreate>[0]>(
	"foods/create",
	async (payload) => {
		return await apiCreate(payload);
	},
);

export const updateFoodThunk = createAsyncThunk<Food, { id: string; payload: Parameters<typeof apiUpdate>[1] }>(
	"foods/update",
	async ({ id, payload }) => {
		return await apiUpdate(id, payload);
	},
);

export const deleteFoodThunk = createAsyncThunk<string, string>(
	"foods/delete",
	async (id) => {
		await apiDelete(id);
		return id;
	},
);

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
	extraReducers: (builder) => {
		builder
			.addCase(fetchFoods.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchFoods.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = "succeeded";
			})
			.addCase(fetchFoods.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message ?? "Failed to fetch foods";
			})
			.addCase(createFoodThunk.fulfilled, (state, action) => {
				state.items.unshift(action.payload);
			})
			.addCase(updateFoodThunk.fulfilled, (state, action) => {
				const idx = state.items.findIndex((f) => f.id === action.payload.id);
				if (idx >= 0) state.items[idx] = action.payload;
			})
			.addCase(deleteFoodThunk.fulfilled, (state, action) => {
				state.items = state.items.filter((f) => f.id !== action.payload);
			});
	},
});

export const { setItems, setStatus, setError, setSearchTerm, reset } = foodsSlice.actions;
export default foodsSlice.reducer;


