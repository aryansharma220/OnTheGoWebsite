import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import bgImg from "../assets/signupp.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div
  className="text-cyan-300 font-semibold min-h-screen flex justify-center bg-cover"
  style={{
    backgroundImage: `url(${bgImg})`,
  }}
>
  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-2/3 bg-slate-200 border border-gray-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 md:relative top-10 bg-transparent">
    <h1 className="text-2xl sm:text-3xl text-center font-semibold my-4 sm:my-7">Sign In</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-40 text-black lowercase"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-40 text-black"
        id="password"
        onChange={handleChange}
      />

      <button
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      >
        {loading ? "Loading..." : "Sign In"}
      </button>
      <OAuth />
    </form>
    <div className="flex gap-2 mt-4 sm:mt-5 text-white">
      <p>Don't have an account?</p>
      <Link to={"/sign-up"}>
        <span className="text-cyan-500 hover:underline">Sign up</span>
      </Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
  </div>
</div>

  );
}
