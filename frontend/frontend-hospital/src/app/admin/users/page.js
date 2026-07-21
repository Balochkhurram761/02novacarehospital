"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // Get All Users
  const get_user = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/users/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const delete_user = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://127.0.0.1:8000/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      get_user();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_user();
  }, []);

  return (
    <div className="p-8">

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>

        <Link
          href="/admin/users/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add User
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3">ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Approved</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="py-4">{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.approved ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-center gap-4">

                      <Link href={`/admin/users/${user.id}`}>
                        <FaEdit
                          size={20}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>

                      <button
                        onClick={() => delete_user(user.id)}
                      >
                        <FaTrash
                          size={20}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No Users Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}