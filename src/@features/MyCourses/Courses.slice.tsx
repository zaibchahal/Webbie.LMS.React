import { createSlice } from '@reduxjs/toolkit';
import { initialCourse, initialCourseList, initialLecture } from '../../services/Courses.server';

const InitialState = {
	isLoading: true,
	CoursesList: initialCourseList,
	myCourses: initialCourse,
	sectionLectures: initialLecture,
	videoImageScr: '',
};

export const coursesSlicer = createSlice({
	name: 'courses',
	initialState: InitialState,
	reducers: {
		UpdateCoursesList: (state, action) => {
			state.CoursesList = action.payload;
		},
		UpdateMyCourse: (state, action) => {
			state.myCourses = action.payload;
		},
		UpdateSectionLectures: (state, action) => {
			state.sectionLectures = action.payload;
		},
		UpdateVideoSrc: (state, action) => {
			state.videoImageScr = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder;
	},
});

// Action creators are generated for each case reducer function
export const { UpdateCoursesList, UpdateMyCourse, UpdateSectionLectures,UpdateVideoSrc } = coursesSlicer.actions;
export default coursesSlicer.reducer;
