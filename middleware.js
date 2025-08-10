import { NextResponse } from "next/server";

// Simple cookie-based protection for admin pages and APIs
// Token format: base64url("admin|<exp_ms>").base64url(HMAC_SHA256(secret, payloadPart))

const ADMIN_PROTECTED_PREFIX = "/admin";
const ADMIN_API_PROTECTED_PREFIX = "/api/admin";
const ALLOWED_PATHS = new Set([
  "/api/admin/auth/login",
  "/api/admin/auth/logout",
  "/api/admin/auth/session",
]);

function isPublic(pathname) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/public")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  return false;
}

function base64UrlFromBytes(bytes) {
  let binary = "";
  const arr = new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) binary += String.fromCharCode(arr[i]);
  const b64 = btoa(binary);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToString(b64url) {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  const binary = atob(b64);
  let utf8 = "";
  for (let i = 0; i < binary.length; i++)
    utf8 += String.fromCharCode(binary.charCodeAt(i));
  return utf8;
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
    // payload format: "admin|<exp_ms>"
    const parts = payloadStr.split("|");
    if (parts.length !== 2) return false;
    const expMs = Number(parts[1]);
    if (!expMs || Number.isNaN(expMs)) return false;
    const now = Date.now();
    if (now > expMs) return false; // expired
    return true;
  } catch (_e) {
    return false;
  }
}

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;

  // Allow public and specific auth endpoints
  if (isPublic(pathname) || ALLOWED_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith(ADMIN_PROTECTED_PREFIX);
  const isAdminApi = pathname.startsWith(ADMIN_API_PROTECTED_PREFIX);

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Allow unauthenticated access to login page so the user can log in
  if (pathname === "/admin/login") {
    // If already logged in then redirect to admin
    const sessionCookie = req.cookies.get("admin_session")?.value;
    const ok = await verifyToken(sessionCookie);
    if (ok) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Read session cookie
  const sessionCookie = req.cookies.get("admin_session")?.value;
  const ok = await verifyToken(sessionCookie);

  if (ok) {
    return NextResponse.next();
  }

  // Not authenticated
  if (isAdminApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("next", pathname + (search || ""));
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
