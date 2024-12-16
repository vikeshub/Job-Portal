import { createSlice } from "@reduxjs/toolkit";
import exp from "constants";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    allAdminJobs:[],
    searchJobByText:"",
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});
export const { setAllJobs, setSingleJob,setAllAdminJobs,setSearchJobByText } = jobSlice.actions;
export default jobSlice.reducer;
