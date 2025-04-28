import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
