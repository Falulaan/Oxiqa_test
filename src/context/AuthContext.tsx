"use client";


import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "user" | null; 
type RoleWithoutNull = Exclude <Role, null > ;
type AuthContextType = {
    role: Role;
    login: (role: RoleWithoutNull) => void;
    logout: () => void;
};


const AuthContext = createContext <AuthContextType | undefined > (undefined);

// Local Storage initialization
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState <Role >(() => {
        if (typeof window !== "undefined") {
            const storedRole = localStorage.getItem("role") as Role | null;
            return storedRole;
        }
        return null;        

    });

    const login = (role: RoleWithoutNull) => {
        setRole(role);
        localStorage.setItem("role", role); // Store the role in local storage
    };

    const logout = () => {
        setRole(null);
        localStorage.removeItem("role"); // Remove the role from local storage
    };

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
        
    };
    return context;
};