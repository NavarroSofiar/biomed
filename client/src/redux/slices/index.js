import { createSlice } from '@reduxjs/toolkit';

export const state = createSlice({
  name: "state",
  initialState: {
    jobs: [],
    detail: [],
    loading: false,
  },
  reducers: {
    getAlljobs: (state, action) => {
      state.jobs = action.payload
    },
    getJobById: (state, action) => {
      state.detail = action.payload
    },
    changeLoading: (state, action) => {
      state.loading = action.payload
    },
  }
}
)
export const { getAlljobs, getJobById,changeLoading } = state.actions
export default state.reducer