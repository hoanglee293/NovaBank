import type { MockUser } from "@/mocks/types/mock-auth.types";

export const mockUsers: MockUser[] = [
  {
    id: "usr_001",

    fullName: "Nguyen Van A",

    email: "customer@novabank.com",

    password: "Banking@123",

    role: "CUSTOMER",
  },

  {
    id: "usr_002",

    fullName: "Premium Customer",

    email: "premium@novabank.com",

    password: "Banking@123",

    role: "PREMIUM_CUSTOMER",
  },

  {
    id: "usr_003",

    fullName: "NovaBank Admin",

    email: "admin@novabank.com",

    password: "Banking@123",

    role: "ADMIN",
  },
];