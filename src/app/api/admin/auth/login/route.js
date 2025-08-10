import { NextResponse } from "next/server";

function base64UrlFromBytes(bytes) {
  const buf = Buffer.from(new Uint8Array(bytes));
  const b64 = buf.toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlEncodeString(str) {
  const b64 = Buffer.from(str, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function POST(request) {
  try {
    const { password } = await request.json();

    // Hardcoded password. Override with env for production.
    const validPassword = process.env.ADMIN_PASSWORD || "cityias-admin-2025";
    if (password !== validPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Issue signed token with expiry (24 hours)
    const expMs = Date.now() + 24 * 60 * 60 * 1000;
    const payload = `admin|${expMs}`;
    const payloadB64 = base64UrlEncodeString(payload);

    const secret = process.env.ADMIN_SECRET || "change-me-please";
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(payloadB64)
    );
    const sigB64 = base64UrlFromBytes(signature);
    const token = `${payloadB64}.${sigB64}`;

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });
    return res;
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Bad Request" },
      { status: 400 }
    );
  }
}
