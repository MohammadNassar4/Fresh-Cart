import * as zod from "zod";

export const updateUserPassSchema = zod
  .object({
    currentPassword: zod
      .string()
      .nonempty("Password is required")
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"),
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
