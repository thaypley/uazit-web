"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/pocketbase-admin";

const navItem: React.CSSProperties = {
  fontFamily: "STALPH, serif",
  fontSize: "0.85rem",
  letterSpacing: "0.08em",
  color: "var(--blackish)",
  padding: "0.45rem 0.7rem",
  borderRadius: "3px",
  textDecoration: "none",
  display: "block",
  cursor: "pointer",
  background: "none",
  border: "none",
  textAlign: "left",
  width: "100%",
};

const navActive: React.CSSProperties = {
  color: "var(--pink)",
  background: "rgba(241,119,174,0.1)",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* sidebar */}
      <aside
        style={{
          width: "200px",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 40,
          background: "var(--bg-alt)",
          borderRight: "1px solid rgba(241,119,174,0.2)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "STALPH, serif",
            color: "var(--pink)",
            fontSize: "1.1rem",
            letterSpacing: "0.06em",
            paddingLeft: "0.7rem",
            marginBottom: "2rem",
          }}
        >
          back room
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem", flex: 1 }}>
          <Link
            href="/admin"
            style={{ ...navItem, ...(pathname === "/admin" ? navActive : {}) }}
          >
            all posts
          </Link>
          <Link
            href="/admin/new"
            style={{ ...navItem, ...(pathname === "/admin/new" ? navActive : {}) }}
          >
            + new post
          </Link>
        </nav>

        <div
          style={{
            borderTop: "1px solid rgba(241,119,174,0.15)",
            paddingTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.15rem",
          }}
        >
          <a
            href="https://uazit.art"
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...navItem, color: "var(--blue)" }}
          >
            view site ↗
          </a>
          <button onClick={handleLogout} style={{ ...navItem, color: "var(--text-dim)" }}>
            logout
          </button>
        </div>
      </aside>

      {/* main content */}
      <main style={{ flex: 1, marginLeft: "200px", background: "var(--background)" }}>
        {children}
      </main>
    </div>
  );
}
