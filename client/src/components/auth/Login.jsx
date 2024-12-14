import React, { useState } from "react";
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
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINTS } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader, Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINTS}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))

        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login Now</h1>

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
              <span>Recruiter</span>
            </label>
          </div>

          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait Loading...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Login
            </Button>
          )}

          <div>
            <span className="text-sm">
              Dont have an account ?{" "}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
