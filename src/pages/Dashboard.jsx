import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import StatCards from "../components/dashboard/StatCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import { getDashboardConfig } from "../config/dashboardConfig";

export default function Dashboard() {
  const { user } = useAuth();
  const config = getDashboardConfig(user?.role);

  return (
    <main className="page dashboard-page" style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>{config.title}</h1>
        <p style={styles.subtitle}>{config.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <StatCards stats={config.stats} />

      {/* Quick Actions */}
      {config.quickActions && config.quickActions.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2 style={styles.sectionTitle}>Quick Actions</h2>
          <div style={styles.actionsGrid}>
            {config.quickActions.map((action) => (
              <Link
                key={action.id}
                to={action.path}
                style={{
                  ...styles.actionCard,
                  borderLeft: `4px solid ${action.color}`,
                }}
              >
                <span style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                  {action.icon}
                </span>
                <span style={styles.actionLabel}>{action.label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <section style={{ marginTop: "2rem" }}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <RecentActivity items={[]} />
      </section>
    </main>
  );
}

const styles = {
  page: {
    padding: "clamp(1.5rem, 3vw, 2.5rem)",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
    paddingBottom: "1.5rem",
    borderBottom: "2px solid #e5e7eb",
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
  sectionTitle: {
    fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "1.25rem",
    letterSpacing: "-0.01em",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
  },
  actionCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2.5rem 1.5rem",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    textDecoration: "none",
    transition: "all 0.2s",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  actionLabel: {
    fontSize: "0.9375rem",
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
};
