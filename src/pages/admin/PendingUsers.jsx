import { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { usePendingUsers, useApproveUser, useRejectUser } from "../../hooks/useAdmin";
import { USER_ROLES, ROLE_LABELS } from "../../utils/authConstants";
import Loader from "../../components/common/Loader";

export default function PendingUsers() {
  const { data: users = [], isLoading } = usePendingUsers();
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();

  const handleApprove = useCallback(async (userId, userName, role) => {
    await approveUser.mutateAsync({ userId, role });
  }, [approveUser]);

  const handleReject = useCallback(async (userId, userName) => {
    const reason = prompt("Enter rejection reason (optional):");
    if (reason === null) return; // User cancelled

    await rejectUser.mutateAsync({ userId, reason });
  }, [rejectUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Pending User Approvals</h1>
          <p style={styles.subtitle}>Review and approve new user registrations</p>
        </div>
        <Link to="/users" style={styles.backBtn}>
          ← All Users
        </Link>
      </div>

      {/* Empty state */}
      {!isLoading && users.length === 0 && (
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon}>✅</span>
          <h3>No pending approvals</h3>
          <p>All user registrations have been reviewed.</p>
        </div>
      )}

      {/* Users list */}
      {users.length > 0 && (
        <div style={styles.cardGrid}>
          {users.map((user) => (
            <PendingUserCard
              key={user.id}
              user={user}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const PendingUserCard = memo(function PendingUserCard({ user, onApprove, onReject }) {
  const [selectedRole, setSelectedRole] = useState(USER_ROLES.DEVELOPER);

  const handleApprove = useCallback(() => {
    onApprove(user.id, user.name, selectedRole);
  }, [onApprove, user.id, user.name, selectedRole]);

  const handleReject = useCallback(() => {
    onReject(user.id, user.name);
  }, [onReject, user.id, user.name]);

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={styles.userInfo}>
          <h3 style={styles.userName}>{user.name}</h3>
          <p style={styles.userEmail}>{user.email}</p>
        </div>
      </div>

      <div style={styles.cardBody}>
        <div style={styles.infoRow}>
          <span style={styles.label}>Registered:</span>
          <span style={styles.value}>
            {new Date(user.created_at).toLocaleDateString()}
          </span>
        </div>

        <div style={styles.roleSelector}>
          <label style={styles.label}>Assign Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={styles.select}
          >
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.cardActions}>
        <button
          onClick={handleApprove}
          style={styles.approveBtn}
        >
          ✓ Approve as {ROLE_LABELS[selectedRole]}
        </button>
        <button
          onClick={handleReject}
          style={styles.rejectBtn}
        >
          ✕ Reject
        </button>
      </div>
    </div>
  );
});

const styles = {
  container: {
    padding: "clamp(1.5rem, 3vw, 2.5rem)",
    maxWidth: "1400px",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 0.625rem 0",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.6",
  },
  backBtn: {
    padding: "0.875rem 1.75rem",
    background: "white",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  successAlert: {
    padding: "1.125rem 1.375rem",
    marginBottom: "1.75rem",
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    color: "#065f46",
    borderRadius: "10px",
    border: "1px solid #10b981",
    fontSize: "0.9375rem",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(16, 185, 129, 0.1)",
  },
  errorAlert: {
    padding: "1.125rem 1.375rem",
    marginBottom: "1.75rem",
    background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
    color: "#991b1b",
    borderRadius: "10px",
    border: "1px solid #ef4444",
    fontSize: "0.9375rem",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(239, 68, 68, 0.1)",
  },
  emptyState: {
    textAlign: "center",
    padding: "clamp(3rem, 6vw, 5rem) 2rem",
    background: "white",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1.25rem",
    display: "block",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: "1.75rem",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1.125rem",
    padding: "1.75rem",
    borderBottom: "1px solid #f3f4f6",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.375rem",
    fontWeight: "700",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "1.1875rem",
    fontWeight: "700",
    color: "#111827",
    margin: "0 0 0.375rem 0",
    letterSpacing: "-0.01em",
  },
  userEmail: {
    fontSize: "0.9375rem",
    color: "#6b7280",
    margin: 0,
  },
  cardBody: {
    padding: "1.75rem",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.25rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  value: {
    fontSize: "0.9375rem",
    color: "#111827",
    fontWeight: "500",
  },
  roleSelector: {
    display: "flex",
    flexDirection: "column",
    gap: "0.625rem",
  },
  select: {
    padding: "0.875rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    cursor: "pointer",
    background: "white",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  cardActions: {
    display: "flex",
    gap: "0.875rem",
    padding: "1.25rem 1.75rem",
    background: "#f9fafb",
    borderTop: "1px solid #f3f4f6",
  },
  approveBtn: {
    flex: 1,
    padding: "0.875rem",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
  },
  rejectBtn: {
    padding: "0.875rem 1.75rem",
    background: "white",
    color: "#ef4444",
    border: "1px solid #ef4444",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
