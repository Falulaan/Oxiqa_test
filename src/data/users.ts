import type { RoleWithoutNull } from "@context/AuthContext";

export type UserType = {
  email: string;
  password: string;
  role: RoleWithoutNull;
};

export const initialUsers: UserType[] = [
  {
    email: "admin@site.com",
    password: "admin123",
    role: "admin",
  },
  {
    email: "user@site.com",
    password: "user123",
    role: "user",
  },
];
