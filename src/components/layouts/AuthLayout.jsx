export default function AuthLayout({ children }) {
  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.brandSection}>
          <div style={styles.logo}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{marginRight: '12px'}}>
              <rect width="40" height="40" rx="10" fill="white" fillOpacity="0.15"/>
              <path d="M20 10L27 14.5V25.5L20 30L13 25.5V14.5L20 10Z" fill="white"/>
            </svg>
            LogTrack
          </div>
          <h1 style={styles.heading}>Welcome Back</h1>
          <p style={styles.subheading}>
            Professional bug tracking and project management for modern teams
          </p>
        </div>

        <div style={styles.features}>
          <Feature icon="🐛" title="Bug Tracking" desc="Track and resolve issues efficiently" />
          <Feature icon="📊" title="Analytics" desc="Real-time insights and reporting" />
          <Feature icon="👥" title="Collaboration" desc="Work together seamlessly" />
          <Feature icon="🔒" title="Secure" desc="Enterprise-grade security" />
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div style={styles.feature}>
      <span style={styles.featureIcon}>{icon}</span>
      <div>
        <h3 style={styles.featureTitle}>{title}</h3>
        <p style={styles.featureDesc}>{desc}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "clamp(2rem, 5vw, 4rem)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "400px",
  },
  brandSection: {
    marginBottom: "3rem",
  },
  logo: {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: "700",
    marginBottom: "1rem",
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  subheading: {
    fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
    opacity: 0.95,
    lineHeight: 1.6,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  feature: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
  },
  featureIcon: {
    fontSize: "2rem",
  },
  featureTitle: {
    fontSize: "1.0625rem",
    fontWeight: "600",
    marginBottom: "0.25rem",
  },
  featureDesc: {
    opacity: 0.9,
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(1.5rem, 4vw, 3rem)",
    background: "#f9fafb",
  },
  formContainer: {
    width: "100%",
    maxWidth: "480px",
  },
};
