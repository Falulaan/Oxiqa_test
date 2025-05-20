"use client";

import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockTasks } from "@data/tasks";

export default function TasksPage() {
  const { role } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!role) {
      router.push("/login");
    }
  }, [role, router]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  if (!email) return null;

  const userTasks = mockTasks.filter((task) => task.user === email);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Tasks</h1>
      <ul className="space-y-4">
        {userTasks.map((task, index) => (
          <li
            key={index}
            className="bg-gray-800 text-white p-4 rounded shadow"
          >
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
