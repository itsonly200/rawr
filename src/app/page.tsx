import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: "0 1rem", textAlign: "center" }}>
      <h1>rawr</h1>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
        <Link href="/login" style={{ padding: "0.5rem 1.5rem", border: "1px solid #333", textDecoration: "none", color: "#333" }}>
          Log in
        </Link>
        <Link href="/register" style={{ padding: "0.5rem 1.5rem", background: "#333", color: "#fff", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </main>
  );
}
