import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface userDetailsState {
	id: string;
	name: string;
	email: string;
	avatar: string;
}

const initialState: userDetailsState = {
	id: "",
	name: "",
	email: "",
	avatar: "",
};

export const userDetailsSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setUserDetails: (state, action: PayloadAction<userDetailsState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.avatar = action.payload.avatar;
		},
		resetUserDetails: (state) => {
			state.id = "";
			state.name = "";
			state.email = "";
			state.avatar = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUserDetails, resetUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
