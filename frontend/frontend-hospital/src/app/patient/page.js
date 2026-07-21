"use client";

import {
  FaCalendarCheck,
  FaFileMedical,
  FaUserMd,
  FaClock,
  FaPhone,
  FaBirthdayCake
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";


export default function PatientDashboard() {


  const [profile,setProfile] = useState(null);



  const getProfile = async()=>{

    try{

      const token = localStorage.getItem("token");

      console.log("token", token)
      const res = await axios.get(
        "http://127.0.0.1:8000/patient/profile",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setProfile(res.data);


    }catch(error){

      console.log(error.response?.data);

    }

  };



  useEffect(()=>{

    getProfile();

  },[]);





  const cards = [
    {
      title: "Total Appointments",
      value: "5",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Medical Records",
      value: "12",
      icon: <FaFileMedical />,
    },
    {
      title: "My Doctors",
      value: "3",
      icon: <FaUserMd />,
    },
    {
      title: "Upcoming Visits",
      value: "2",
      icon: <FaClock />,
    },
  ];



  return (
    <div>


      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Patient Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome back! Manage your health information here.
        </p>

      </div>



      {/* Patient Info */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">


        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-5">


          <div className="bg-cyan-100 p-4 rounded-full">

            <FaPhone className="text-cyan-600 text-3xl"/>

          </div>


          <div>

            <p className="text-gray-500">
              Phone Number
            </p>


            <h2 className="text-2xl font-bold">

              {profile?.phone || "Loading..."}

            </h2>


          </div>


        </div>





        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-5">


          <div className="bg-green-100 p-4 rounded-full">

            <FaBirthdayCake className="text-green-600 text-3xl"/>

          </div>


          <div>

            <p className="text-gray-500">
              Age
            </p>


            <h2 className="text-2xl font-bold">

              {profile?.age || "Loading..."}

            </h2>


          </div>


        </div>


      </div>





      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


        {
          cards.map((card,index)=>(

            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition"
            >

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>


                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </h2>


              </div>


              <div className="text-3xl text-cyan-500">

                {card.icon}

              </div>


            </div>

          ))
        }


      </div>





      {/* Recent Activity */}

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">


        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>


        <p className="text-gray-500">
          No recent activity.
        </p>


      </div>



    </div>
  );
}