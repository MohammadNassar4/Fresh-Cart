import * as zod from "zod";

export const LoginSchema = zod
  .object({
    email: zod.string().nonempty("Email is required").email("Invalid email"),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"),
  })
