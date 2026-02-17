import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { USER_ROLES } from "../../utils/authConstants";

export default function Header() {
  const { user, logout, hasRole } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <h1 style={styles.title}>Welcome back, {user?.name}!</h1>
      </div>

      <div style={styles.right}>
        {/* Admin quick access to pending approvals */}
        {hasRole(USER_ROLES.ADMIN) && (
          <Link to="/users/pending" style={styles.notificationBtn}>
            <span style={styles.icon}>⏳</span>
            <span>Pending Approvals</span>
          </Link>
        )}

        {/* Notifications */}
        <button style={styles.iconBtn} title="Notifications">
          <span style={styles.icon}>🔔</span>
        </button>

        {/* User menu */}
        <div style={styles.userMenuContainer}>
          <button
            style={styles.userMenuBtn}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <span style={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
            <span style={styles.userName}>{user?.name || "User"}</span>
            <span style={styles.chevron}>▼</span>
          </button>

          {showUserMenu && (
            <div style={styles.userDropdown}>
              <Link
                to="/profile"
                style={styles.dropdownItem}
                onClick={() => setShowUserMenu(false)}
              >
                👤 Profile
              </Link>
              <Link
                to="/settings"
                style={styles.dropdownItem}
                onClick={() => setShowUserMenu(false)}
              >
                ⚙️ Settings
              </Link>
              <button style={styles.dropdownItem} onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: "70px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 clamp(1.5rem, 4vw, 2.5rem)",
    position: "sticky",
    top: 0,
    zIndex: 50,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: "1.375rem",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  notificationBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1.125rem",
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    color: "#92400e",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(245, 158, 11, 0.15)",
  },
  iconBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.125rem",
    transition: "all 0.2s",
    color: "#6b7280",
  },
  icon: {
    fontSize: "1.125rem",
  },
  userMenuContainer: {
    position: "relative",
  },
  userMenuBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 0.875rem",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  userAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.875rem",
  },
  userName: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#111827",
  },
  chevron: {
    fontSize: "0.625rem",
    color: "#9ca3af",
  },
  userDropdown: {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    right: 0,
    minWidth: "220px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    zIndex: 100,
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "0.875rem 1.25rem",
    border: "none",
    background: "transparent",
    color: "#374151",
    fontSize: "0.9375rem",
    fontWeight: "500",
    textAlign: "left",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background 0.15s",
  },
};
