import { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "user" | null; 
type RoleWithoutNull = Exclude <Role, null > ;
type AuthContextType = {
    role: Role;
    login: (role: RoleWithoutNull) => void;
    logout: () => void;
};


const AuthContext = createContext <AuthContextType | undefined > (undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState <Role > (null);

    const login = (role: RoleWithoutNull) => {
        setRole(role);
    };

    const logout = () => {
        setRole(null);
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