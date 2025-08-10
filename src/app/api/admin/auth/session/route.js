import { NextResponse } from "next/server";

function base64UrlToString(b64url) {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  const buf = Buffer.from(b64, "base64");
  return buf.toString("utf8");
}

function base64UrlFromBytes(bytes) {
  const buf = Buffer.from(new Uint8Array(bytes));
  const b64 = buf.toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function verifyToken(token) {
  try {
    if (!token || typeof token !== "string") return false;
    const [payloadPart, sigPart] = token.split(".");
    if (!payloadPart || !sigPart) return false;
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
      new TextEncoder().encode(payloadPart)
    );
    const expectedSig = base64UrlFromBytes(signature);
    if (expectedSig !== sigPart) return false;
    const payloadStr = base64UrlToString(payloadPart);
    const parts = payloadStr.split("|");
    if (parts.length !== 2) return false;
    const expMs = Number(parts[1]);
    if (!expMs || Number.isNaN(expMs)) return false;
    if (Date.now() > expMs) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(request) {
  const token = request.cookies.get("admin_session")?.value;
  const ok = await verifyToken(token);
  return NextResponse.json({ authenticated: ok });
}
