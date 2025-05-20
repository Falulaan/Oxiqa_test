export type Role = "admin" | "user";

export type User = {
  email: string;
  password: string;
  role: Role;
};

export const fallbackUsers: User[] = [
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
