import { createSlice } from '@reduxjs/toolkit'

const InitialState = {
  isLoading: true,
  kBList: [],
}

export const kbSlice = createSlice({
  name: 'knowladgeBaseStore',
  initialState: InitialState,
  reducers: {
    UpdatekBList: (state, action) => {
      state.kBList = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
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
})

// Action creators are generated for each case reducer function
export const { UpdatekBList } = kbSlice.actions
export default kbSlice.reducer
