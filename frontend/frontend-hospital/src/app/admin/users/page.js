"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  const get_user = async () => {
    try {
       const token = localStorage.getItem("token");
    //    console.log("TOKEN:", token);
      const response = await axios.get("http://127.0.0.1:8000/users/users",{
         headers: {
      Authorization: `Bearer ${token}`,
    },
      });

    //   console.log(response.data);

      setUsers(response.data); // ya response.data.detail
    } catch (error) {
      console.log(error);
    }
  };
  const delete_user = async(id)=>{
    try {
       const token = localStorage.getItem("token");
       console.log("TOKEN:", token);
      await axios.delete(`http://127.0.0.1:8000/users/delete/${id}`,{
         headers: {
      Authorization: `Bearer ${token}`,
    },
      });
    get_user();
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get_user();
  }, []);

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>

        <Link
          href="/admin/users/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add User
        </Link>
      </div>

      <table className="w-full border">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {users?.map((user) => (

            <tr key={user.id} className="text-center border-b">

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              <td>
                <Link href={`/admin/users/${user.id}`}>
                  <FaEdit />
                </Link>

                <button className="cursor-pointer" onClick={() => delete_user(user.id)} >
                  <FaTrash />
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}