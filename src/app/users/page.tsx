"use client";
import { useAuth } from "@context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleWithoutNull } from "@context/AuthContext";
import { useState } from "react";


export default function UsersPage() {
    const { role } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<
  { email: string; password: string; role: RoleWithoutNull }[]
>([
  {
    email: "admin@site.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "user@site.com",
    password: "user123",
    role: "user",
  },
]);
    const handleDelete = (email: string) => {
    const updated = users.filter((user) => user.email !== email);
    setUsers(updated);
    };


    useEffect(() => {
        if (!role) {
            router.push("/login");
        } else if (role !== "admin") {
            router.push("/dashboard");
        }
    }, [role, router]);

if (role == null){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
    );
}

if (role !== "admin") return null;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">Users Page</h1>
        <ul className="space-y-2">
            {users.map((user, index) => (
        <li
      key={index}
      className="bg-gray-800 text-white px-4 py-2 rounded flex justify-between items-center"
        >
      <div>
        <p className="font-semibold">{user.email}</p>
        <p className="text-sm text-gray-300">Role: {user.role}</p>
      </div>
      <button
        onClick={() => handleDelete(user.email)}
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
        </li>
        ))}
        </ul>


        <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >Go to Dashboard</button>
        </div>
    );
}