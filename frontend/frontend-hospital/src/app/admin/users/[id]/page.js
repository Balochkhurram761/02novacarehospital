"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaUserCircle } from "react-icons/fa";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const getSingleUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">User Details</h1>
          <p className="text-gray-500">View complete user information</p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/admin/users"
            className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            <FaArrowLeft />
          </Link>

          <Link
            href={`/admin/users/${id}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FaEdit />
            Edit
          </Link>

        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-5xl">
            <FaUserCircle />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold text-gray-600">
              User ID
            </label>

            <p className="mt-2 bg-gray-100 rounded-lg p-3">
              {user.id}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-600">
              Role
            </label>

            <p className="mt-2 bg-blue-100 text-blue-700 rounded-lg p-3">
              {user.role}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold text-gray-600">
              Address
            </label>

            <p className="mt-2 bg-gray-100 rounded-lg p-3">
              {user.address}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}