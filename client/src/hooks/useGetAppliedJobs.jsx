import { setAllAppliedJobs } from "@/redux/jobsSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error.response?.data?.message || error.message);
      }
      
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJobs;
