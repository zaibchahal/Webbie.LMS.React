import { createSlice } from '@reduxjs/toolkit';
import { initialCourseList } from '../../services/Courses.server';

const InitialState = {
	isLoading: true,
	CoursesList: initialCourseList,
};

export const coursesSlicer = createSlice({
	name: 'courses',
	initialState: InitialState,
	reducers: {
		UpdateCoursesList: (state, action) => {
			state.CoursesList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder;
	},
});

// Action creators are generated for each case reducer function
export const { UpdateCoursesList } = coursesSlicer.actions;
export default coursesSlicer.reducer;
