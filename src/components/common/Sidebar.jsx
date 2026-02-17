import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getNavigationItems } from "../../config/navigationConfig";
import { ROLE_LABELS } from "../../utils/authConstants";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navItems = getNavigationItems(user?.role);

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="app-sidebar" style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.logo}>LogTrack</h2>
        <span style={styles.role}>{ROLE_LABELS[user?.role] || "User"}</span>
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              ...(isActive(item.path) ? styles.linkActive : {}),
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.label}>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span style={styles.badge}>{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.user}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{user?.name || "User"}</div>
            <div style={styles.userEmail}>{user?.email || ""}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "280px",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 100,
  },
  header: {
    padding: "1.75rem 1.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    color: "#111827",
    letterSpacing: "-0.01em",
  },
  role: {
    fontSize: "0.8125rem",
    color: "#6366f1",
    textTransform: "capitalize",
    fontWeight: "600",
    background: "#ede9fe",
    padding: "0.25rem 0.75rem",
    borderRadius: "100px",
    display: "inline-block",
  },
  nav: {
    flex: 1,
    padding: "1.5rem 0",
    overflowY: "auto",
  },
  link: {
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.5rem",
    color: "#6b7280",
    textDecoration: "none",
    transition: "all 0.15s",
    position: "relative",
    margin: "0 0.75rem",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "500",
  },
  linkActive: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
  },
  icon: {
    marginRight: "0.75rem",
    fontSize: "1.125rem",
  },
  label: {
    flex: 1,
  },
  badge: {
    background: "#ef4444",
    color: "white",
    padding: "0.125rem 0.5rem",
    borderRadius: "12px",
    fontSize: "0.6875rem",
    fontWeight: "600",
    minWidth: "20px",
    textAlign: "center",
  },
  footer: {
    padding: "1rem 1.5rem",
    borderTop: "1px solid #e5e7eb",
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem",
    borderRadius: "8px",
    background: "#f9fafb",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "1.0625rem",
    color: "white",
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  userName: {
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "0.125rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#111827",
  },
  userEmail: {
    fontSize: "0.75rem",
    color: "#6b7280",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
