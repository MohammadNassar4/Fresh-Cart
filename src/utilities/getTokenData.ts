import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenData() {
  const cookie = await cookies();
  const sessionToken = cookie.get("next-auth.session-token")?.value;
  const accessToken = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return accessToken?.token;
}
