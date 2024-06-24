import { configureStore } from "@reduxjs/toolkit";

import userDetailsSlice from "../features/userDetails.reducer";

export const store = configureStore({
	reducer: {
		userDetails: userDetailsSlice,
	},
});
