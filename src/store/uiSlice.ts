import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
	modalAddOpen: boolean;
	modalEditId: string | null;
	modalDeleteId: string | null;
	globalLoading: boolean;
};

const initialState: UiState = {
	modalAddOpen: false,
	modalEditId: null,
	modalDeleteId: null,
	globalLoading: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		openAdd(state) {
			state.modalAddOpen = true;
		},
		closeAdd(state) {
			state.modalAddOpen = false;
		},
		openEdit(state, action: PayloadAction<string>) {
			state.modalEditId = action.payload;
		},
		closeEdit(state) {
			state.modalEditId = null;
		},
		openDelete(state, action: PayloadAction<string>) {
			state.modalDeleteId = action.payload;
		},
		closeDelete(state) {
			state.modalDeleteId = null;
		},
		setGlobalLoading(state, action: PayloadAction<boolean>) {
			state.globalLoading = action.payload;
		},
	},
});

export const {
	openAdd,
	closeAdd,
	openEdit,
	closeEdit,
	openDelete,
	closeDelete,
	setGlobalLoading,
} = uiSlice.actions;
export default uiSlice.reducer;


