import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
import bgImg from "../assets/hommee.jpg";

export default function SignUp() {
  const institutionDomain = '@vitbhopal.ac.in'
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  //   console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
  className="text-cyan-300 font-semibold min-h-screen flex justify-center bg-cover"
  style={{
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 h-3/4 bg-slate-200 border border-gray-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 md:relative top-10 bg-transparent">
    <h1 className="text-2xl sm:text-3xl text-center font-semibold my-4 sm:my-7 text-white">Sign Up</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Registration Number"
        className="h-12 w-full px-2 py-1 rounded focus-within:outline-red-300 bg-white opacity-40 text-black"
        id="username"
        onChange={handleChange}
      />
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
        {loading ? "Loading..." : "Sign Up"}
      </button>
      <OAuth />
    </form>
    <div className="flex gap-2 mt-4 sm:mt-5 text-white">
      <p>Have an account?</p>
      <Link to={"/sign-in"}>
        <span className="text-cyan-500 hover:underline">Sign In</span>
      </Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
  </div>
</div>

  );
}
