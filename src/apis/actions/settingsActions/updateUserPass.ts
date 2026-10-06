'use server';

import { updateUserPassSchema } from "@/schemas/updateUserPass"
import { getTokenData } from "@/utilities/getTokenData";
import * as zod from "zod";


export async function updateUserPass(data: zod.infer<typeof updateUserPassSchema>) {
  const token = await getTokenData();
  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${process.env.API_BASE_URL}users/changeMyPassword`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
    });

    if (!response.ok) throw new Error(await response.text());
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}



