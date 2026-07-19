"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FaHospitalAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setformdata]=useState({
    name:"",
    email:"",
    password:"",
    address:"",
  })
 const handleform = (e) => {
  const { name, value } = e.target;

  setformdata((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  const UserRegister=async(e)=>{
     e.preventDefault();
  try{

  
  const response=await axios.post("http://127.0.0.1:8000/users/register", formdata)
  toast.success("User registered successfully!");
  }
  catch(err){
    toast.error(
      "Registration failed!"
    );
   console.log(err.response?.data)
  }
  }
 
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
              type="text" value={formdata.name} name="name" onChange={handleform}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email" name="email" value={formdata.email} onChange={handleform}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Address
            </label>

            <textarea
              rows="3" name="address" value={formdata.address} onChange={handleform}
              placeholder="Enter your address"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <div className="relative">
              <input name="password" value={formdata.password} onChange={handleform}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-4 top-3 text-blue-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 rounded-xl font-semibold"
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