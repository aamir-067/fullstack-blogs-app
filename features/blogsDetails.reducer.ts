import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface Blog {
	content: string;
	image: string;
	title: string;
	time: number;
}

export interface BlogsDetails {
	allBlogs: {
		details: Array<Blog>;
		ids: Array<string>;
	};
	userBlogs: {
		details: Array<Blog>;
		ids: Array<string>;
	};
}

const initialState: BlogsDetails = {
	allBlogs: {
		details: [],
		ids: [],
	},
	userBlogs: {
		details: [],
		ids: [],
	},
};

export const blogsSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setBlogs: (state, action: PayloadAction<InitialState>) => {
			state.allBlogs = action.payload.allBlogs;
			state.userBlogs = action.payload.userBlogs;
		},
		resetBlogs: (state) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setBlogs, resetBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;