export default function Reports() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Reports & Analytics</h1>
          <p style={styles.subtitle}>Generate detailed reports and insights</p>
        </div>
        <button style={styles.primaryBtn}>+ Create Report</button>
      </div>

      <div style={styles.placeholder}>
        <span style={styles.icon}>📈</span>
        <h2 style={styles.placeholderTitle}>Analytics & Reporting</h2>
        <p style={styles.placeholderText}>
          Generate comprehensive reports to track project progress and team performance.
        </p>
        <div style={styles.featureList}>
          <div style={styles.feature}>✓ Project progress reports</div>
          <div style={styles.feature}>✓ Bug resolution metrics</div>
          <div style={styles.feature}>✓ Team performance analytics</div>
          <div style={styles.feature}>✓ Export to PDF/Excel</div>
        </div>
      </div>
    </div>
  );
}

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
  primaryBtn: {
    padding: "0.875rem 1.75rem",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.25)",
    transition: "all 0.2s",
  },
  placeholder: {
    background: "white",
    borderRadius: "16px",
    border: "2px dashed #cbd5e1",
    padding: "clamp(3rem, 6vw, 5rem) 2rem",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  icon: {
    fontSize: "clamp(4rem, 8vw, 5.5rem)",
    display: "block",
    marginBottom: "1.75rem",
  },
  placeholderTitle: {
    fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.875rem",
    letterSpacing: "-0.01em",
  },
  placeholderText: {
    fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
    color: "#6b7280",
    marginBottom: "2.5rem",
    lineHeight: "1.6",
  },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  feature: {
    padding: "1rem 1.25rem",
    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    borderRadius: "8px",
    color: "#374151",
    fontSize: "0.9375rem",
    fontWeight: "500",
    border: "1px solid #e5e7eb",
  },
};
