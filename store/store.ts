import { configureStore } from "@reduxjs/toolkit";

import userDetailsSlice from "../features/userDetails.reducer";
import blogsSlice from "../features/blogsDetails.reducer";

export const store = configureStore({
	reducer: {
		userDetails: userDetailsSlice,
		blogsDetails: blogsSlice,
	},
});
