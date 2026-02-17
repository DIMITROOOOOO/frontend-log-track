export default function RecentActivity({ items = [] }) {
  if (items.length === 0) {
    return (
      <div style={styles.emptyState}>
        <span style={styles.emptyIcon}>📭</span>
        <p style={styles.emptyText}>No recent activity</p>
      </div>
    );
  }

  return (
    <ul style={styles.list}>
      {items.map((item) => (
        <li key={item.id || item.timestamp} style={styles.item}>
          <span style={styles.message}>{item.message}</span>
          <time style={styles.time}>{item.timestamp}</time>
        </li>
      ))}
    </ul>
  );
}

const styles = {
  emptyState: {
    background: "white",
    padding: "3rem 2rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  emptyIcon: {
    fontSize: "3rem",
    display: "block",
    marginBottom: "1rem",
  },
  emptyText: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
    fontWeight: "500",
  },
  list: {
    background: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    listStyle: "none",
    margin: 0,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.125rem 0",
    borderBottom: "1px solid #f3f4f6",
  },
  message: {
    fontSize: "0.9375rem",
    color: "#374151",
    fontWeight: "500",
  },
  time: {
    fontSize: "0.8125rem",
    color: "#9ca3af",
    fontWeight: "500",
  },
};
