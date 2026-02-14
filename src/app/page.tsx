"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

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
    setLoginLoading(false);

    if (!res.ok) {
      setLoginError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegisterError("");
    setRegisterLoading(true);

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
    setRegisterLoading(false);

    if (!res.ok) {
      setRegisterError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <>
      <div className="header-bar">
        <span className="logo">rawr</span>
        <form className="header-login" onSubmit={handleLogin}>
          <label htmlFor="header-email">Email</label>
          <input id="header-email" name="email" type="email" required />
          <label htmlFor="header-password">Password</label>
          <input id="header-password" name="password" type="password" required />
          <button type="submit" className="btn btn-small btn-login" disabled={loginLoading}>
            {loginLoading ? "..." : "Log In"}
          </button>
        </form>
      </div>
      {loginError && (
        <div style={{ maxWidth: 900, margin: "10px auto 0", padding: "0 20px" }}>
          <p className="error-msg">{loginError}</p>
        </div>
      )}

      <div className="splash-container">
        <div className="splash-left">
          <h1>rawr</h1>
          <p className="splash-tagline">
            rawr helps you connect and share with the people in your life.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/skyrim-map.jpg"
            alt="Map of Skyrim"
            className="splash-image"
          />
        </div>
        <div className="splash-right">
          <h2 className="signup-heading">Sign Up</h2>
          <p className="signup-subtext">It&apos;s quick and easy.</p>
          {registerError && <p className="error-msg">{registerError}</p>}
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="reg-name">Full Name:</label>
              <input id="reg-name" name="name" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="reg-email">Email:</label>
              <input id="reg-email" name="email" type="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">New Password:</label>
              <input id="reg-password" name="password" type="password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-register" disabled={registerLoading}>
              {registerLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
