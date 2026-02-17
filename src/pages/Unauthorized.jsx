import { getCurrentUser } from "../services/authService";

export default function Unauthorized() {
  const user = getCurrentUser();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/dashboard";
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
          🚫
        </div>
        
        <h1 style={{ color: "#dc3545", marginBottom: "1rem" }}>
          Access Denied
        </h1>
        
        <div style={{
          padding: "1.5rem",
          backgroundColor: "#f8d7da",
          borderRadius: "6px",
          marginBottom: "1.5rem",
          border: "1px solid #f5c6cb"
        }}>
          <p style={{ margin: 0, color: "#721c24" }}>
            You don't have permission to access this page.
          </p>
        </div>

        {user && (
          <div style={{ 
            fontSize: "0.875rem", 
            color: "#666",
            marginBottom: "1.5rem"
          }}>
            <p>
              You are currently logged in as <strong>{user.name}</strong> with 
              the role of <strong>{user.role}</strong>.
            </p>
            <p>
              This page requires different permissions. If you believe you should 
              have access, please contact your administrator.
            </p>
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={handleGoBack}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
