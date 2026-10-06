'use server';

import { UpdateProfileData } from "@/app/profile/settings/page";
import { getTokenData } from "@/utilities/getTokenData";

export async function updateUserData(data: UpdateProfileData) {
  const token = await getTokenData();
  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${process.env.API_BASE_URL}users/updateMe/`, {
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