"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define all role types
export type Role = "admin" | "user" | null;

// Export type without null (for login-safe roles)
export type RoleWithoutNull = Exclude<Role, null>;

// Context structure
type AuthContextType = {
  role: Role;
  login: (role: RoleWithoutNull) => void;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role") as Role | null;
      return storedRole;
    }
    return null;
  });

  const login = (newRole: RoleWithoutNull) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
