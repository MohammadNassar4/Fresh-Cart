import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum 3 letters")
      .max(20, "Maximum 20 letters"),
    email: zod.string().nonempty("Email is required").email("Invalid email"),
    phone: zod.string().nonempty("Phone Number is required").regex(/^(?:\+20|0020|0)1[0125]\d{8}$/,'Please enter a valid Egyptian phone number'),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"),
    rePassword: zod.string().nonempty("Please confirm your password"),
  })
  .refine(
    (obj) => {
      return obj.password === obj.rePassword;
    },
    {
      path: ["rePassword"],
      message: "Password and confirm password must be the same",
    },
  );
