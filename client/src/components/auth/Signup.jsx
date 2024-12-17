import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINTS } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const navigate = useNavigate();
  const { loading,user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(input);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINTS}/register`, formData, {
        headers: {
          "Content-Type": "multiple/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
    useEffect(() => {
      if (user) {
        navigate("/");
      }
    }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up Now</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Enter Your Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Your Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Your Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            ></Input>
          </div>
          <div class="flex items-center space-x-6">
            <label class="flex items-center space-x-3">
              <input
                type="radio"
                name="role"
                value="student"
                class="peer hidden"
                className="cursor-pointer"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              {/* <span class="w-5 h-5 inline-block rounded-full border-2 border-gray-300 peer-checked:bg-gray-600"></span> */}
              <span>Student</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                class="peer hidden"
                className="cursor-pointer"
              />
              {/* <span class="w-5 h-5 inline-block rounded-full border-2 border-gray-300  peer-checked:bg-gray-600"></span> */}
              <span>Recruiter</span>
            </label>
          </div>

          <div className="flex items-center gap-2 my-2">
            <Label>Upload </Label>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={changeFileHandler}
            ></Input>
          </div>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait Loading...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Signup
            </Button>
          )}
          <div>
            <span className="text-sm">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
