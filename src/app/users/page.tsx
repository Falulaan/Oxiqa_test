"use client";

import { useAuth } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fallbackUsers as initialUsers, User } from "@data/users";

export default function UsersPage() {
  const { role } = useAuth();
  const router = useRouter();

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

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as "admin" | "user";

    if (!email || !password || !role) {
      alert("Please fill out all fields.");
      return;
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("User already exists.");
      return;
    }

    const newUser: User = { email, password, role };
    setUsers([...users, newUser]);
    form.reset();
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

      <form
        onSubmit={handleAddUser}
        className="w-full max-w-md mt-8 space-y-4"
      >
        <h2 className="text-lg font-semibold text-white">Add New User</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        />

        <input
          name="password"
          type="text"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        />

        <select
          name="role"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add User
        </button>
      </form>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-6"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
