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
	topBlog: {
		details: Blog;
		owner: any;
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
	topBlog: {
		details: null,
		owner: null,
	},
};

export const blogsSlice = createSlice({
	name: "userDetails",
	initialState,
	reducers: {
		setBlogs: (state, action: PayloadAction<BlogsDetails>) => {
			state.allBlogs = action.payload.allBlogs;
			state.userBlogs = action.payload.userBlogs;
			state.topBlog = action.payload.topBlog;
		},
		resetBlogs: (state) => {
			state = initialState;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setBlogs, resetBlogs } = blogsSlice.actions;

export default blogsSlice.reducer;
