import { createSlice } from '@reduxjs/toolkit';
import {
    initialCourses,
    initialCoursesList,
    initialLecture,
    initialCourse,
    initialVideoDetails,
} from '../../services/Courses.server';

const InitialState = {
    isLoading: true,
    CoursesList: initialCoursesList,
    myCourses: initialCourses,
    Course: initialCourse,
    sectionLectures: initialLecture,
    videoScr: '',
    videoDetails: initialVideoDetails,
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
            state.videoScr = action.payload;
        },
        UpdateCourse: (state, action) => {
            state.Course = action.payload;
        },
        UpdateVideoDetails: (state, action) => {
            state.videoDetails = action.payload;
        },
    },
    extraReducers: (/*builder*/) => {

    },
});

// Action creators are generated for each case reducer function
export const {
    UpdateCoursesList,
    UpdateMyCourse,
    UpdateSectionLectures,
    UpdateVideoSrc,
    UpdateCourse,
    UpdateVideoDetails,
} = coursesSlicer.actions;
export default coursesSlicer.reducer;
