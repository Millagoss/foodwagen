import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "../types/food";
import {
  createFood as apiCreate,
  deleteFood as apiDelete,
  listFoods as apiList,
  searchFoods as apiSearch,
  updateFood as apiUpdate,
} from "../lib/api/food";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

type FoodsState = {
  items: Food[];
  status: RequestStatus;
  error: string | null;
  searchTerm: string;
  page: number;
  limit: number;
  hasMore: boolean;
};

const initialState: FoodsState = {
  items: [],
  status: "idle",
  error: null,
  searchTerm: "",
  page: 1,
  limit: 10,
  hasMore: true,
};

export const fetchFoods = createAsyncThunk<
  Food[],
  { term?: string; page?: number; limit?: number } | undefined
>(
  "foods/fetch",
  async (args, { signal }) => {
    const t = args?.term?.trim();
    const page = args?.page ?? 1;
    const limit = args?.limit ?? 10;
    if (t) return await apiSearch(t, { page, limit, signal });
    return await apiList({ page, limit, signal });
  },
);

export const createFoodThunk = createAsyncThunk<
  Food,
  Parameters<typeof apiCreate>[0]
>("foods/create", async (payload) => {
  return await apiCreate(payload);
});

export const updateFoodThunk = createAsyncThunk<
  Food,
  { id: string; payload: Parameters<typeof apiUpdate>[1] }
>("foods/update", async ({ id, payload }) => {
  return await apiUpdate(id, payload);
});

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
    appendItems(state, action: PayloadAction<Food[]>) {
      state.items = [...state.items, ...action.payload];
    },
    setStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.page = 1;
      state.hasMore = true;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    reset(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.searchTerm = "";
      state.page = 1;
      state.limit = 10;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        if (state.page > 1) {
          state.items = [...state.items, ...action.payload];
        } else {
          state.items = action.payload;
        }
        state.status = "succeeded";
        state.hasMore = action.payload.length >= state.limit;
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

export const { setItems, appendItems, setStatus, setError, setSearchTerm, setPage, setLimit, reset } =
  foodsSlice.actions;
export default foodsSlice.reducer;
