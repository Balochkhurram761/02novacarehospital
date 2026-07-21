"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaNotesMedical,
  FaPlus,
  FaEye
} from "react-icons/fa";


export default function Appointments() {


  const [appointments,setAppointments] = useState([]);
  const [loading,setLoading] = useState(true);



  const getAppointments = async()=>{

    try{

      const token = localStorage.getItem("token");


      const res = await axios.get(
        "http://127.0.0.1:8000/appointments/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setAppointments(res.data);


    }catch(error){

      console.log(
        error.response?.data || error.message
      );

    }finally{

      setLoading(false);

    }

  };




  useEffect(()=>{

    getAppointments();

  },[]);




  if(loading){

    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Appointments...
      </div>
    );

  }





  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-5xl mx-auto">



        <div className="flex justify-between items-center mb-8">


          <h1 className="text-3xl font-bold">
            My Appointments
          </h1>



          <Link

            href="/patient/appointment/create"

            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"

          >

            <FaPlus/>

            Add Appointment

          </Link>


        </div>





        {
          appointments.length === 0 ? (


            <div className="bg-white p-8 rounded-xl text-center">

              No Appointment Found

            </div>


          ) : (



            <div className="grid md:grid-cols-2 gap-6">



              {
                appointments.map((item)=>(



                  <div

                    key={item.id}

                    className="bg-white p-6 rounded-xl shadow"

                  >



                    <div className="flex gap-3 items-center mb-5">


                      <FaUserMd className="text-blue-600 text-xl"/>



                      <div>


                        <h2 className="text-xl font-semibold">

                          {item.doctor?.name || "Doctor"}

                        </h2>


                        <p className="text-gray-500">

                          {item.doctor?.specialization || "Specialization"}

                        </p>


                      </div>



                    </div>






                    <p className="flex gap-3 mb-3">

                      <FaCalendarAlt/>

                      {item.appointment_date}


                    </p>





                    <p className="flex gap-3 mb-3">

                      <FaClock/>

                      {item.appointment_time}


                    </p>





                    <p className="flex gap-3 mb-3">

                      <FaNotesMedical/>

                      {item.reason}


                    </p>






                    <div className="flex justify-between items-center mt-5">



                      <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">

                        {item.status || "Pending"}

                      </span>





                      <Link

                        href={`/patient/appointments/${item.id}`}

                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                      >

                        <FaEye/>

                        Detail


                      </Link>




                    </div>





                  </div>



                ))
              }



            </div>


          )
        }



      </div>


    </div>

  );

}