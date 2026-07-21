"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleform = (e) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const UserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login",
        formdata
      );

      toast.success("Login Successfully!");

      const token = response.data.access_token;

      localStorage.setItem("token", token);

      // Decode JWT
      const payload = JSON.parse(atob(token.split(".")[1]));

      const role = payload.role;

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "doctor") {
        router.push("/doctor");
      } else if (role === "patient") {
        router.push("/patient");
      } else {
        toast.error("Invalid Role");
      }
    } catch (err) {
      console.log(err.response?.data);

      toast.error(
        err.response?.data?.detail || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            NovaCare
          </h1>

          <p className="text-gray-500 mt-2">
            Hospital Management System
          </p>
        </div>

        <form className="space-y-5" onSubmit={UserLogin}>
          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleform}
              placeholder="Enter email"
              className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleform}
                placeholder="Enter password"
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-blue-600 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            href="/"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}