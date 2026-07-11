import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_PASSWORD,
  SESSION_COOKIE,
  createSessionToken,
  verifyPassword,
  verifySessionToken,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { password?: string };
  if (!verifyPassword(body.password || "")) {
    return NextResponse.json({ error: "Şifre hatalı." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return NextResponse.json({
    authenticated: verifySessionToken(token),
    hint: process.env.NODE_ENV === "development" ? ADMIN_PASSWORD.length : undefined,
  });
}
