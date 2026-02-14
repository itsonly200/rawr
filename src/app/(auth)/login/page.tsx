"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <div className="header-bar">
        <Link href="/" className="logo">rawr</Link>
      </div>
      <div className="auth-box">
        <div className="auth-box-header">Log In</div>
        <div className="auth-box-body">
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" type="password" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <p className="form-footer">
            No account? <Link href="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}
