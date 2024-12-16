import { setSingalComapny } from "@/redux/companySlice";
import { setAllJobs } from "@/redux/jobsSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSinglecompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingalComapny(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglecompany();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
