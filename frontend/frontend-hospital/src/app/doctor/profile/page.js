"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUserMd,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaStethoscope,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";


export default function DoctorProfile() {

  const [profile,setProfile] = useState(null);
  const [loading,setLoading] = useState(true);
  const getProfile = async()=>{
    try{

      const token = localStorage.getItem("token");
      const res = await axios.get(

        "http://127.0.0.1:8000/doctors/profile",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      setProfile(res.data);

    }catch(error){
      console.log(error.response?.data);
      setProfile(null);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    getProfile();
  },[]);

  const deleteProfile = async()=>{
    const confirmDelete = window.confirm(
      "Are you sure you want to delete profile?"
    );

    if(!confirmDelete) return;
    try{
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        "http://127.0.0.1:8000/doctors/profile",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );
      toast.success(res.data.message);
      setProfile(null);
    }catch(error){
      toast.error(
        error.response?.data?.detail ||
        "Delete failed"
      );

    }
  };

  if(loading){

    return(
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold">
          Loading Profile...
        </h1>
      </div>
    )
  }
  if(!profile){
    return(
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center">
          <FaUserMd className="text-6xl text-cyan-600 mx-auto"/>
          <h1 className="text-3xl font-bold mt-5">
            Doctor Profile Not Found
          </h1>
          <p className="text-gray-500 my-5">
            Create your doctor profile first
          </p>
          <Link href="/doctor/profile/create"  className="bg-cyan-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 justify-center">
            <FaPlus/>
            Create Profile
          </Link>
        </div>
      </div>
    )
  }
  return(
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <div className="bg-white p-5 rounded-full">
                <FaUserMd className="text-cyan-600 text-5xl"/>
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  Doctor Profile
                </h1>
                <p>
                  Professional Information
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/doctor/profile/edit" className="bg-white text-blue-600 px-5 py-3 rounded-xl flex gap-2 items-center">
                <FaEdit/>
                Edit
              </Link>
              <button
              onClick={deleteProfile}
              className="bg-red-600 px-5 py-3 rounded-xl flex gap-2 items-center">
                <FaTrash/>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl mt-10 p-8">
          <h2 className="text-2xl font-bold mb-8 border-b pb-4">
            Doctor Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
            title="Name"
            value={profile.name}
            />
            <InfoCard
            title="Email"
            value={profile.email}
            />
            <InfoCard
            title="Address"
            value={profile.address}
            />
            <InfoCard
            title="Specialization"
            value={profile.specialization}
            />
            <InfoCard
            title="Experience"
            value={`${profile.experience} Years`}
            />
            <InfoCard
            title="Qualification"
            value={profile.qualification}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({title,value}){
return(
<div className="bg-slate-100 rounded-xl p-5">
<p className="text-gray-500 mb-2">
{title}
</p>
<h2 className="text-xl font-bold">
{value}
</h2>
</div>
)
}