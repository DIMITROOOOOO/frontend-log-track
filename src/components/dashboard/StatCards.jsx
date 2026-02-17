export default function StatCards({ stats = [] }) {
  return (
    <div style={styles.container}>
      {stats.map((stat) => (
        <div style={styles.card} key={stat.label}>
          <p style={styles.label}>{stat.label}</p>
          <p style={styles.value}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1.25rem",
  },
  card: {
    background: "white",
    padding: "1.75rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#6b7280",
    margin: "0 0 0.75rem 0",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  value: {
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
};
