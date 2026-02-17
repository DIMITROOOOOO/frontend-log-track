import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";
import { ForbiddenError } from "../services/api";

export default function Login() {
  const [error, setError] = useState("");
  const [pendingApproval, setPendingApproval] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setError("");
    setPendingApproval(false);

    try {
      const response = await login(credentials);
      
      if (response.success && response.data) {
        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      if (err instanceof ForbiddenError) {
        // Account is pending approval
        if (err.message.includes("pending")) {
          setPendingApproval(true);
          setError("Your account is pending admin approval. You will receive an email once approved.");
        } else {
          setError(err.message);
        }
      } else {
        setError(err.message || "Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>
          Sign in to your LogTrack account
        </p>

        {pendingApproval && (
          <div style={styles.pendingAlert}>
            <strong style={styles.alertTitle}>⏳ Account Pending Approval</strong>
            <p style={styles.alertText}>
              Your registration is being reviewed by an administrator. 
              You'll receive an email notification once your account is approved.
            </p>
          </div>
        )}

        {error && !pendingApproval && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        {loading && (
          <div style={styles.loadingText}>
            <p>Signing in...</p>
          </div>
        )}

        <LoginForm onSubmit={handleLogin} />

        <div style={styles.footer}>
          <p>
            Don't have an account?{" "}
            <a href="/register" style={styles.link}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "clamp(2rem, 5vw, 3rem)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
  },
  title: {
    fontSize: "clamp(1.5rem, 4vw, 2rem)",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "0.5rem",
    textAlign: "center",
    letterSpacing: "-0.01em",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "2rem",
    fontSize: "0.9375rem",
  },
  pendingAlert: {
    padding: "1rem 1.25rem",
    marginBottom: "1.5rem",
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: "12px",
    border: "1px solid #fde68a",
  },
  alertTitle: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.9375rem",
  },
  alertText: {
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  errorAlert: {
    padding: "1rem 1.25rem",
    marginBottom: "1.5rem",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "12px",
    border: "1px solid #fecaca",
    fontSize: "0.9375rem",
  },
  loadingText: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#6b7280",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  link: {
    color: "#6366f1",
    textDecoration: "none",
    fontWeight: "600",
  },
};

