import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/temp.reducer";
import userDetailsSlice from "../features/userDetails.reducer";

export const store = configureStore({
	reducer: {
		counter: counterSlice,
		userDetails: userDetailsSlice,
	},
});
