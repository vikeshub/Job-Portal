import { setAllJobs, setSingleJob } from "@/redux/jobsSlice";
import { JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();


};

export default useGetSingleJob;