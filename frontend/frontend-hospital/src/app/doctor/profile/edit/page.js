"use client";

import {useEffect,useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FaSave,FaArrowLeft} from "react-icons/fa";

export default function EditDoctorProfile(){

const router=useRouter();

const [loading,setLoading]=useState(true);

const [formData,setFormData]=useState({
name:"",
address:"",
specialization:"",
experience:"",
qualification:""
});


const getProfile=async()=>{

try{

const token=localStorage.getItem("token");

const response=await axios.get(
"http://127.0.0.1:8000/doctors/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setFormData({
name:response.data.name || "",
address:response.data.address || "",
specialization:response.data.specialization || "",
experience:response.data.experience || "",
qualification:response.data.qualification || ""
});


}catch(error){

console.log(error.response?.data);
toast.error("Profile load failed");

}finally{

setLoading(false);

}

};


useEffect(()=>{
getProfile();
},[]);



const handleChange=(e)=>{

setFormData({
...formData,
[e.target.name]:e.target.value
});

};



const updateProfile=async(e)=>{

e.preventDefault();

try{

const token=localStorage.getItem("token");

await axios.put(
"http://127.0.0.1:8000/doctors/profile",
formData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);


toast.success("Profile Updated Successfully");

router.push("/doctor/profile");


}catch(error){

console.log(error.response?.data);

toast.error(
error.response?.data?.detail || "Update failed"
);

}

};



if(loading){

return(
<div className="min-h-screen flex justify-center items-center">
<h1 className="text-2xl font-bold">Loading...</h1>
</div>
);

}



return(

<div className="min-h-screen bg-slate-100 py-10 px-5">

<div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">

<div className="flex justify-between items-center mb-8">

<h1 className="text-3xl font-bold">
Edit Doctor Profile
</h1>

<Link
href="/doctor/profile"
className="flex gap-2 items-center bg-gray-700 text-white px-4 py-2 rounded-lg"
>
<FaArrowLeft/>
Back
</Link>

</div>


<form onSubmit={updateProfile} className="space-y-5">


<div>
<label className="font-semibold">Name</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleChange}
className="w-full border rounded-xl p-4"
/>
</div>





<div>
<label className="font-semibold">Address</label>
<textarea
name="address"
value={formData.address}
onChange={handleChange}
className="w-full border rounded-xl p-4"
/>
</div>


<div>
<label className="font-semibold">Specialization</label>
<input
type="text"
name="specialization"
value={formData.specialization}
onChange={handleChange}
className="w-full border rounded-xl p-4"
/>
</div>


<div>
<label className="font-semibold">Experience</label>
<input
type="number"
name="experience"
value={formData.experience}
onChange={handleChange}
className="w-full border rounded-xl p-4"
/>
</div>


<div>
<label className="font-semibold">Qualification</label>
<input
type="text"
name="qualification"
value={formData.qualification}
onChange={handleChange}
className="w-full border rounded-xl p-4"
/>
</div>


<button
type="submit"
className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-3"
>
<FaSave/>
Update Profile
</button>


</form>

</div>

</div>

);

}