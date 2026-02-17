import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{marginRight: '8px'}}>
              <rect width="32" height="32" rx="8" fill="#6366f1"/>
              <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" fill="white"/>
            </svg>
            <span>LogTrack</span>
          </div>
          <nav style={styles.nav}>
            <Link to="/login" style={styles.loginBtn}>Login</Link>
            <Link to="/register" style={styles.signupBtn}>Sign Up</Link>
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>🚀 Professional Bug Tracking</div>
            <h1 style={styles.heroTitle}>
              Track Bugs, Manage Projects,<br/>Deliver Faster
            </h1>
            <p style={styles.heroSubtitle}>
              The comprehensive solution for bug tracking and project management. 
              Collaborate with your team and ship quality software.
            </p>
            <div style={styles.heroCta}>
              <Link to="/register" style={styles.primaryBtn}>
                Get Started Free
              </Link>
              <a href="#features" style={styles.secondaryBtn}>
                Learn More
              </a>
            </div>
            <p style={styles.heroNote}>No credit card required • Free forever</p>
          </div>
        </section>

        <section id="features" style={styles.features}>
          <h2 style={styles.sectionTitle}>Everything You Need</h2>
          <div style={styles.featureGrid}>
            <FeatureCard 
              icon="🐛"
              title="Bug Tracking"
              description="Track, prioritize, and resolve bugs efficiently with powerful filtering and search capabilities."
            />
            <FeatureCard 
              icon="📊"
              title="Project Management"
              description="Manage multiple projects with ease. Assign tasks, set deadlines, and monitor progress."
            />
            <FeatureCard 
              icon="👥"
              title="Team Collaboration"
              description="Work together seamlessly with role-based access control and real-time updates."
            />
            <FeatureCard 
              icon="📈"
              title="Analytics & Reports"
              description="Get insights with visual dashboards and export detailed reports for stakeholders."
            />
            <FeatureCard 
              icon="🔔"
              title="Real-time Notifications"
              description="Stay informed with instant notifications for updates, mentions, and status changes."
            />
            <FeatureCard 
              icon="🔒"
              title="Secure & Reliable"
              description="Enterprise-grade security with role-based permissions and data encryption."
            />
          </div>
        </section>

        <section style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to get started?</h2>
          <p style={styles.ctaText}>
            Join teams already using LogTrack to build better software.
          </p>
          <Link to="/register" style={styles.primaryBtn}>
            Create Free Account →
          </Link>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 LogTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#ffffff",
  },
  header: {
    position: "sticky",
    top: 0,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #e5e7eb",
    zIndex: 50,
  },
  headerContent: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#111827",
  },
  nav: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
  },
  loginBtn: {
    padding: "0.625rem 1.25rem",
    color: "#6b7280",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "0.9375rem",
    transition: "all 0.2s",
  },
  signupBtn: {
    padding: "0.625rem 1.5rem",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.9375rem",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
    transition: "all 0.2s",
  },
  main: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  hero: {
    textAlign: "center",
    padding: "4rem 0 6rem",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
    color: "#6366f1",
    borderRadius: "100px",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "1.5rem",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  heroSubtitle: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#6b7280",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
  heroCta: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  heroNote: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    marginTop: "1rem",
  },
  primaryBtn: {
    padding: "1rem 2rem",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "1.0625rem",
    fontWeight: "600",
    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
    transition: "all 0.3s",
    border: "none",
  },
  secondaryBtn: {
    padding: "1rem 2rem",
    background: "white",
    color: "#6366f1",
    textDecoration: "none",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1.0625rem",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  features: {
    padding: "5rem 0",
  },
  sectionTitle: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "3rem",
    color: "#111827",
    letterSpacing: "-0.02em",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  featureCard: {
    padding: "2rem",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    textAlign: "center",
    transition: "all 0.3s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  featureIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    display: "block",
  },
  featureTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "0.75rem",
  },
  featureDescription: {
    color: "#6b7280",
    lineHeight: 1.6,
    fontSize: "0.9375rem",
  },
  ctaSection: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)",
    borderRadius: "24px",
    margin: "4rem 0",
  },
  ctaTitle: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#111827",
    letterSpacing: "-0.02em",
  },
  ctaText: {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#6b7280",
    marginBottom: "2rem",
  },
  footer: {
    textAlign: "center",
    padding: "2rem 1.5rem",
    borderTop: "1px solid #e5e7eb",
    color: "#9ca3af",
    fontSize: "0.875rem",
  },
};
