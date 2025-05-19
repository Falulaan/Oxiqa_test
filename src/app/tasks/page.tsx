"use client";
import { useAuth } from "@context/AuthContext";
import { useEffect } from "react"; 
import { useRouter } from "next/navigation";

export default function TaskPage(){
    const { role } = useAuth();
    const router = useRouter();

    useEffect (() => {
        if (!role) {
            router.push("/login");
        }
    }
    , [role, router]);

    if (!role) {
        return null; // or a loading spinner
    }

    const tasks = [
    { id: 1, title: "Complete assessment", assignedTo: "user" },
    { id: 2, title: "Review pull requests", assignedTo: "admin" },
    { id: 3, title: "Fix UI bugs", assignedTo: "admin" }
  ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <ul className="space-y-3 w-full max-w-md">
        {tasks
        
        .filter((task) => task.assignedTo === role) // Filter tasks based on the role
        .map((task) => (
          <li key={task.id} className="bg-gray-800 p-4 rounded">
            ✅ {task.title} — <span className="italic text-sm text-gray-400">({task.assignedTo})</span>
          </li>
        ))}
      </ul>
    </div>
    );
};

