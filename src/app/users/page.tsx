"use client";
import { useAuth } from "@context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
    const { role } = useAuth();
    const router = useRouter();

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
        <ul className="space-y-4">
            <li className="text-lg">User 1</li>
            <li className="text-lg">User 2</li>
            <li className="text-lg">User 3</li>
        </ul>
        <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >Go to Dashboard</button>
        </div>
    );
}