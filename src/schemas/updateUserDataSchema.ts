import * as zod from "zod";

export const updateUserDataSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Minimum 3 letters")
      .max(20, "Maximum 20 letters"),
    email: zod.string().nonempty("Email is required").email("Invalid email"),
    phone: zod.string().nonempty("Phone Number is required").regex(/^(?:\+20|0020|0)1[0125]\d{8}$/,'Please enter a valid Egyptian phone number'),
  });
