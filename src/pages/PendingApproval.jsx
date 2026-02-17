import { getCurrentUser } from "../services/authService";
import { clearAuthData } from "../services/authService";

export default function PendingApproval() {
  const user = getCurrentUser();

  const handleLogout = () => {
    clearAuthData();
    window.location.href = "/login";
  };

  return (
    <main className="page" style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <div style={{ 
        maxWidth: "600px", 
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          fontSize: "4rem",
          marginBottom: "1rem"
        }}>
          ⏳
        </div>
        
        <h1 style={{ color: "#856404", marginBottom: "1rem" }}>
          Account Pending Approval
        </h1>
        
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#fff3cd",
          borderRadius: "6px",
          marginBottom: "1.5rem",
          border: "1px solid #ffeaa7"
        }}>
          <p style={{ margin: 0, color: "#856404" }}>
            {user?.name ? `Hello ${user.name},` : "Hello,"}<br />
            Your account is currently being reviewed by our administrators.
          </p>
        </div>

        <div style={{ 
          textAlign: "left", 
          marginBottom: "2rem",
          padding: "0 1rem"
        }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>What's next?</h3>
          <ol style={{ paddingLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>An administrator will review your registration details</li>
            <li>You'll receive an email notification once your account is approved</li>
            <li>After approval, you can log in and access the system</li>
          </ol>
        </div>

        <div style={{ 
          fontSize: "0.875rem", 
          color: "#666",
          marginBottom: "1.5rem"
        }}>
          <p>
            If you have any questions or concerns, please contact your administrator.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          Back to Login
        </button>
      </div>
    </main>
  );
}
