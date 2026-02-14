import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      <div className="header-bar">
        <span className="logo">rawr</span>
        <div className="user-info">
          <strong>{session.name ?? session.email}</strong>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="btn btn-small btn-secondary">Log out</button>
          </form>
        </div>
      </div>
      <div className="page-container">
        <div className="content-box">
          <h2>News Feed</h2>
          <p style={{ fontSize: 12, color: "#666" }}>
            Welcome, {session.name ?? session.email}. There are no updates to show right now.
          </p>
        </div>
      </div>
    </>
  );
}
