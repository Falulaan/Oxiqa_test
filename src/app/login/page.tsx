"use client";

import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fallbackUsers, User } from "@data/users";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage or fallback
  useEffect(() => {
    const stored = localStorage.getItem("users");
    setUsers(stored ? JSON.parse(stored) : fallbackUsers);
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid credentials");
      return;
    }

    login(foundUser.role);
    router.push("/dashboard");
    localStorage.setItem("loggedInEmail", foundUser.email);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600"
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
