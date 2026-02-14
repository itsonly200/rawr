"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
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
        <div className="auth-box-header">Create Account</div>
        <div className="auth-box-body">
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input id="name" name="name" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" type="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input id="password" name="password" type="password" required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <p className="form-footer">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
