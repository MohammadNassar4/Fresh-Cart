"use server";

import { registerSchema } from "@/schemas/registerSchema";
import * as zod from "zod";

export async function registerUser(data: zod.infer<typeof registerSchema>) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// export async function loginUser(data: zod.infer<typeof LoginSchema>) {
//   try {
//     const response = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/auth/signin`,
//       {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//           "content-type": "application/json",
//         },
//       },
//     );
//     const payload = await response.json();
//     if (response.ok) {
//       const cookie = await cookies();
//       cookie.set("token", payload.token, {
//         httpOnly: true,
//         secure: true,
//       });
//     }
//     return response.ok;
//   } catch (error) {
//     console.error(error);
//   }
// }
