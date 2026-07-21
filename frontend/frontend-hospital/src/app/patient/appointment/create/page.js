"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function CreateAppointment(){

  const router = useRouter();

  const [doctors,setDoctors] = useState([]);

  const [form,setForm] = useState({
    doctor_id:"",
    reason:""
  });



  const getDoctors = async()=>{

    try{

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:8000/doctors/all",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      setDoctors(res.data);


    }catch(error){

      console.log(
        error.response?.data || error.message
      );

    }

  };



  useEffect(()=>{

    getDoctors();

  },[]);





  const createAppointment = async(e)=>{

    e.preventDefault();


    try{

      const token = localStorage.getItem("token");


      const date = new Date();



      const appointmentData = {

        doctor_id:Number(form.doctor_id),

        reason:form.reason,

        appointment_date:
        date.toISOString().split("T")[0],


        appointment_time:
        date.toTimeString().split(" ")[0]

      };



      await axios.post(

        "http://127.0.0.1:8000/appointments/create",

        appointmentData,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );



      toast.success(
        "Appointment Created Successfully"
      );


      router.push(
        "/patient/appointment"
      );


    }catch(error){

      console.log(
        error.response?.data || error.message
      );


      toast.error(
        "Appointment Failed"
      );

    }

  };






  return(

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">


        <h1 className="text-2xl font-bold mb-6">
          Create Appointment
        </h1>




        <form
          onSubmit={createAppointment}
          className="space-y-5"
        >


          <div>

            <label className="block mb-2 font-medium">
              Select Doctor
            </label>


            <select

              className="w-full border p-3 rounded-lg"

              value={form.doctor_id}

              onChange={(e)=>
                setForm({
                  ...form,
                  doctor_id:e.target.value
                })
              }

              required

            >


              <option value="">
                Select Doctor
              </option>



              {
                doctors.map((doctor)=>(

                  <option
                    key={doctor.id}
                    value={doctor.id}
                  >

                    {doctor.name}
                    {" - "}
                    {doctor.specialization}

                  </option>

                ))
              }


            </select>


          </div>




          <div>


            <label className="block mb-2 font-medium">
              Reason
            </label>


            <textarea

              className="w-full border p-3 rounded-lg"

              placeholder="Enter reason"

              value={form.reason}

              onChange={(e)=>
                setForm({
                  ...form,
                  reason:e.target.value
                })
              }

              required

            />


          </div>




          <button

            type="submit"

            className="w-full bg-green-600 text-white py-3 rounded-lg"

          >

            Create Appointment

          </button>



        </form>


      </div>


    </div>

  );

}