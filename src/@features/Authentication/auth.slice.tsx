import { createSlice } from '@reduxjs/toolkit';
import { ISessionProps, IUserProps } from '../../common/data/userSessionService';

const InitialState = {
    isLoading: true,
    Session: {} as ISessionProps,
    User: {} as IUserProps,
    ProfilePicture: ''
};
export interface ICategory {
    id: number;
    tenantId: number;
    title: string;
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState: InitialState,
    reducers: {
        UpdateSession: (state, action) => {
            state.Session = action.payload;
        },
        clearSession: (state) => {
            state.Session = {} as ISessionProps;
            state.User = {} as IUserProps;
            state.ProfilePicture = '';
        },
        UpdateUser: (state, action) => {
            state.User = action.payload;
        },
        UpdatePic: (state, action) => {
            state.ProfilePicture = action.payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { UpdateSession, UpdateUser, UpdatePic, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
