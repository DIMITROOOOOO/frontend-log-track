import { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useUsers, useUpdateUserRole, useDeleteUser } from "../../hooks/useAdmin";
import { USER_ROLES, ROLE_LABELS, ACCOUNT_STATUS } from "../../utils/authConstants";
import Loader from "../../components/common/Loader";

export default function UserList() {
  const [filter, setFilter] = useState("all");
  
  const filters = filter !== "all" ? { account_status: filter } : {};
  const { data: users = [], isLoading, isFetching } = useUsers(filters);
  const updateUserRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  const handleChangeRole = useCallback(async (userId, newRole) => {
    await updateUserRole.mutateAsync({ userId, role: newRole });
  }, [updateUserRole]);

  const handleDelete = useCallback(async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    await deleteUser.mutateAsync(userId);
  }, [deleteUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>User Management</h1>
          <p style={styles.subtitle}>Manage all system users and their roles</p>
        </div>
        <Link to="/users/pending" style={styles.pendingBtn}>
          ⏳ Pending Approvals
        </Link>
      </div>

      {/* Filter buttons */}
      <div style={styles.filters}>
        {["all", "approved", "pending", "rejected"].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            disabled={isFetching}
            style={{
              ...styles.filterBtn,
              ...(filter === filterOption ? styles.filterBtnActive : {}),
              ...(isFetching ? { opacity: 0.6, cursor: 'wait' } : {}),
            }}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            {isFetching && filter === filterOption && " ⏳"}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {!isLoading && users.length === 0 && (
        <div style={styles.emptyState}>
          <span style={styles.emptyIcon}>👥</span>
          <h3>No users found</h3>
          <p>No users match the selected filter.</p>
        </div>
      )}

      {/* Users table */}
      {users.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Joined</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onChangeRole={handleChangeRole}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const UserRow = memo(function UserRow({ user, onChangeRole, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleSave = useCallback(() => {
    if (selectedRole !== user.role) {
      onChangeRole(user.id, selectedRole);
    }
    setEditing(false);
  }, [selectedRole, user.role, user.id, onChangeRole]);

  const handleCancel = useCallback(() => {
    setSelectedRole(user.role);
    setEditing(false);
  }, [user.role]);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleDeleteClick = useCallback(() => {
    onDelete(user.id, user.name);
  }, [onDelete, user.id, user.name]);

  const getStatusBadge = (status) => {
    const styles = {
      [ACCOUNT_STATUS.PENDING]: { bg: "#fef3c7", color: "#92400e" },
      [ACCOUNT_STATUS.APPROVED]: { bg: "#d1fae5", color: "#065f46" },
      [ACCOUNT_STATUS.REJECTED]: { bg: "#fee2e2", color: "#991b1b" },
    };

    const style = styles[status] || styles.pending;

    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          borderRadius: "12px",
          fontSize: "0.75rem",
          fontWeight: "500",
          background: style.bg,
          color: style.color,
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <tr>
      <td style={styles.td}>
        <div style={styles.userCell}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={styles.userName}>{user.name}</div>
            <div style={styles.userEmail}>{user.email}</div>
          </div>
        </div>
      </td>
      <td style={styles.td}>
        {editing ? (
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
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
            <button onClick={handleSave} style={styles.saveBtn}>
              ✓
            </button>
            <button
              onClick={handleCancel}
              style={styles.cancelBtn}
            >
              ✕
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span>{ROLE_LABELS[user.role]}</span>
            {user.account_status === ACCOUNT_STATUS.APPROVED && (
              <button onClick={handleEdit} style={styles.editBtn}>
                Edit
              </button>
            )}
          </div>
        )}
      </td>
      <td style={styles.td}>{getStatusBadge(user.account_status)}</td>
      <td style={styles.td}>
        {new Date(user.created_at).toLocaleDateString()}
      </td>
      <td style={styles.td}>
        <button
          onClick={handleDeleteClick}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </td>
    </tr>
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
  pendingBtn: {
    padding: "0.875rem 1.75rem",
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    color: "#92400e",
    border: "1px solid #f59e0b",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(245, 158, 11, 0.15)",
    transition: "all 0.2s",
  },
  filters: {
    display: "flex",
    gap: "0.75rem",
    marginBottom: "1.75rem",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "0.625rem 1.25rem",
    background: "white",
    color: "#374151",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    borderColor: "#6366f1",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
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
  tableContainer: {
    background: "white",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "1.125rem 1.25rem",
    background: "#f9fafb",
    borderBottom: "2px solid #e5e7eb",
    fontSize: "0.8125rem",
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  td: {
    padding: "1.125rem 1.25rem",
    borderBottom: "1px solid #f3f4f6",
    fontSize: "0.9375rem",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.875rem",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "1.0625rem",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
  },
  userName: {
    fontWeight: "600",
    color: "#111827",
    fontSize: "0.9375rem",
  },
  userEmail: {
    fontSize: "0.8125rem",
    color: "#6b7280",
    marginTop: "0.125rem",
  },
  select: {
    padding: "0.5rem 0.875rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: "500",
    background: "white",
  },
  editBtn: {
    padding: "0.375rem 0.75rem",
    background: "transparent",
    color: "#6366f1",
    border: "none",
    fontSize: "0.8125rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  saveBtn: {
    padding: "0.375rem 0.625rem",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "600",
    boxShadow: "0 1px 3px rgba(16, 185, 129, 0.2)",
  },
  cancelBtn: {
    padding: "0.375rem 0.625rem",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  deleteBtn: {
    padding: "0.625rem 1.125rem",
    background: "white",
    color: "#ef4444",
    border: "1px solid #ef4444",
    borderRadius: "6px",
    fontSize: "0.8125rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
