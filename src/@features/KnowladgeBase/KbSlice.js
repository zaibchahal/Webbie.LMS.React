import { createSlice } from '@reduxjs/toolkit'

const InitialState = {
  isLoading: true,
  kBList: [
    {
      category: null,
      categoryID: null,
      description: "<p><span style=\"color: rgb(77, 81, 86);\">What is a knowledge base? A knowledge base is&nbsp;",
      id: 1,
      isPopular: false,
      tags: null,
      tenantId: 3,
      thumbnail: "\\Images\\KnowledgeBase\\Screenshot 2023-05-05 220521_a4c7.png",
      title: "Knowledge Base",
    }
  ],
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
