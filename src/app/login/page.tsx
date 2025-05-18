"use client";

import { useAuth } from "@context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<"admin" | "user">("user");
  const router = useRouter();

  const handleLogin = () => {
    login(role);              // set the role globally
    router.push("/dashboard"); // redirect after login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Login Page</h1>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "user")}
        className="border border-gray-300 px-4 py-2 rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
