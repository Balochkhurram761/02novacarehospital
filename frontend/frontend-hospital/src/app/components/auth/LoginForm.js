"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();
  const [formdata, setformdata]=useState({
     
      email:"",
      password:"",
      
    })
   const handleform = (e) => {
    const { name, value } = e.target;
  
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const UserLogin=async(e)=>{
       e.preventDefault();
    try{
  
     
    const response=await axios.post("http://127.0.0.1:8000/users/login", formdata)
    toast.success("User Login successfully!");
    localStorage.setItem("token", response.data.access_token);
    router.push("/admin");

    }
    catch(err){
      toast.error(
        "only admin access plz wait 1 day"
      );
     console.log(err.response?.data)
    }
    }
   

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
              type="email" name="email" value={formdata.email} onChange={handleform}
              placeholder="Enter email"
              className="w-full mt-2 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password" name="password" value={formdata.password} onChange={handleform}
                className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button "
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-3 text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          <button
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?

          <Link href="/" className="text-blue-600 ml-2 cursor-pointer">
           
            Register
           </Link>

        </p>

      </div>

    </div>
  );
}