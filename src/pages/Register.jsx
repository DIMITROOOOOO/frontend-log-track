import { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { register } from "../services/authService";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegister = async (userData) => {
    setError("");
    setLoading(true);

    try {
      const response = await register(userData);
      
      if (response.success) {
        setRegisteredEmail(userData.email);
        setSuccess(true);
      }
    } catch (err) {
      // Handle validation errors
      if (err.name === "ValidationError" && err.data?.errors) {
        const errorMessages = Object.values(err.data.errors)
          .flat()
          .join(". ");
        setError(errorMessages);
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="page login-page">
        <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
          <div style={{
            padding: "2rem",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "8px",
            marginBottom: "1.5rem"
          }}>
            <h2 style={{ marginTop: 0 }}>✓ Registration Successful!</h2>
            <p style={{ marginBottom: 0 }}>
              Your account has been created and is pending admin approval. 
              You will receive an email at <strong>{registeredEmail}</strong> once 
              your account has been verified.
            </p>
          </div>
          
          <div style={{ fontSize: "0.875rem", color: "#666", marginBottom: "1.5rem" }}>
            <p>What happens next:</p>
            <ol style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
              <li>An administrator will review your registration</li>
              <li>You'll receive an email notification once approved</li>
              <li>After approval, you can log in with your credentials</li>
            </ol>
          </div>

          <a 
            href="/login" 
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "500"
            }}
          >
            Return to Login
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="page login-page">
      <h1>Create Account</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Fill in the form below to request access to LogTrack
      </p>
      
      {loading && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p>Creating your account...</p>
        </div>
      )}
      
      <RegisterForm onSubmit={handleRegister} error={error} />
      
      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem" }}>
        <p>
          Already have an account?{" "}
          <a 
            href="/login" 
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
