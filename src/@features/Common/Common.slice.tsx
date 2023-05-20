import { createSlice } from '@reduxjs/toolkit';

const InitialState = {
    isLoading: true,
    CategoryList: [
        {
            id: 1,
            title: '',
            tenantId: 3,
        },
    ],
};
export interface ICategory {
    id: number;
    tenantId: number;
    title: string;
}

export const commonSlicer = createSlice({
    name: 'commonStore',
    initialState: InitialState,
    reducers: {
        UpdateCategoryList: (state, action) => {
            state.CategoryList = [...action.payload];
        },
    },
    extraReducers: (/*builder*/) => {
        //builder
        // .addCase(userLogin.pending, (state, {type, payload}) => {
        //   state.isLoading = true
        // })
        // .addCase(userLogin.fulfilled, (state, action) => {
        //   state.loggedInUser = action.payload.user
        //   state.isLoading = false
        // })
        // .addCase(userLogin.rejected, (state) => {
        //   state.isLoading = false
        // })
    },
});

// Action creators are generated for each case reducer function
export const { UpdateCategoryList } = commonSlicer.actions;
export default commonSlicer.reducer;
