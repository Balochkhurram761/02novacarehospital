"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaHospitalAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "", 
  });

  const handleform = (e) => {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const UserRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register",
        formdata
      );

      console.log(response.data);

      toast.success("User Registered Successfully!");

      setformdata(response.data);

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-3xl text-white">
            <FaHospitalAlt />
          </div>

          <h1 className="text-3xl font-bold text-blue-700 mt-4">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to NovaCare Hospital
          </p>
        </div>

        <form className="space-y-5" onSubmit={UserRegister}>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleform}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleform}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Address
            </label>

            <textarea
              rows={3}
              name="address"
              value={formdata.address}
              onChange={handleform}
              placeholder="Enter your address"
              className="w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleform}
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-blue-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Role
            </label>

            <select
              name="role"
              value={formdata.role}
              onChange={handleform}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}