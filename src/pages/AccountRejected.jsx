import { getCurrentUser, clearAuthData } from "../services/authService";

export default function AccountRejected() {
  const user = getCurrentUser();

  const handleBackToLogin = () => {
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
          ❌
        </div>
        
        <h1 style={{ color: "#721c24", marginBottom: "1rem" }}>
          Account Registration Declined
        </h1>
        
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f8d7da",
          borderRadius: "6px",
          marginBottom: "1.5rem",
          border: "1px solid #f5c6cb"
        }}>
          <p style={{ margin: 0, color: "#721c24" }}>
            {user?.name ? `Hello ${user.name},` : "Hello,"}<br />
            Unfortunately, your account registration has been declined.
          </p>
        </div>

        {user?.rejection_reason && (
          <div style={{
            padding: "1rem",
            backgroundColor: "#fff3cd",
            borderRadius: "6px",
            marginBottom: "1.5rem",
            textAlign: "left"
          }}>
            <strong style={{ display: "block", marginBottom: "0.5rem" }}>
              Reason:
            </strong>
            <p style={{ margin: 0, color: "#856404" }}>
              {user.rejection_reason}
            </p>
          </div>
        )}

        <div style={{ 
          fontSize: "0.875rem", 
          color: "#666",
          marginBottom: "1.5rem"
        }}>
          <p>
            If you believe this is an error or would like to appeal this decision, 
            please contact your administrator for more information.
          </p>
        </div>

        <button
          onClick={handleBackToLogin}
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
