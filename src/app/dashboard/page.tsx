import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main style={{ maxWidth: 600, margin: "80px auto", padding: "0 1rem" }}>
      <h1>Dashboard</h1>
      <p>Welcome, {session.name ?? session.email}</p>
      <LogoutButton />
    </main>
  );
}

function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="POST">
      <button type="submit">Log out</button>
    </form>
  );
}
