"use client";

import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fallbackUsers as initialUsers, User } from "@data/users";



export default function UsersPage() {
  const { role } = useAuth();
  const router = useRouter();

  // ✅ Strongly typed user list state
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("users");
      return stored ? (JSON.parse(stored) as User[]) : initialUsers;
    }
    return initialUsers;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const handleDelete = (email: string) => {
    const updated = users.filter((user: User) => user.email !== email);
    setUsers(updated);
  };

  useEffect(() => {
    if (!role) {
      router.push("/login");
    } else if (role !== "admin") {
      router.push("/dashboard");
    }
  }, [role, router]);

  if (role == null) {
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
        {users.map((user: User, index: number) => (
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
      >
        Go to Dashboard
      </button>
    </div>
  );
}
