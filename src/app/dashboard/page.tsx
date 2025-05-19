"use client";

import {useAuth} from "@context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function DashboardPage() {
    const {role} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!role) {
            router.push("/login");
        }
    }, [role, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-semibold">Dashboard Page</h1>
            <p className="text-lg">Welcome, {role}!</p>
            <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Logout
            </button>
        </div>
    );
}