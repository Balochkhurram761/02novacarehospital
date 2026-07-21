"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditPatientProfile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://127.0.0.1:8000/patient/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        id: res.data.id,
        name: res.data.name,
        address: res.data.address,
        phone: res.data.phone,
        age: res.data.age,
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://127.0.0.1:8000/patient/update/${formData.id}`,
        {
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
          age: Number(formData.age),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Profile Updated Successfully");
      router.push("/patient/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">
      <form
        onSubmit={updateProfile}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Edit Patient Profile
        </h1>

        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />
        </div>

        <div className="mb-6">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}