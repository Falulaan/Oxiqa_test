"use client";

import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!role) return null;

  return (
    <nav className="w-full px-6 py-4 bg-gray-900 text-white flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/tasks" className="hover:underline">Tasks</Link>
        {role === "admin" && (
          <Link href="/users" className="hover:underline">Users</Link>
        )}
      </div>
      <div className="space-x-4">
        <span className="text-sm italic text-gray-300">Logged in as {role}</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
