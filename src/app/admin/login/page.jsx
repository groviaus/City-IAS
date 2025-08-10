"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get("next") || "/admin";

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(next);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || "Invalid password");
      }
    } catch (_e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5" /> Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            You will remain signed in on this device for a limited time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
