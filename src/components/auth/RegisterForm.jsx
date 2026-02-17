import { useState } from "react";

export default function RegisterForm({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.password_confirmation) {
      errors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      {error && (
        <div style={styles.errorAlert}>
          {error}
        </div>
      )}

      <div style={styles.field}>
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{...styles.input, ...(validationErrors.name && styles.inputError)}}
          placeholder="John Doe"
          required
        />
        {validationErrors.name && (
          <span style={styles.fieldError}>{validationErrors.name}</span>
        )}
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{...styles.input, ...(validationErrors.email && styles.inputError)}}
          placeholder="you@example.com"
          required
        />
        {validationErrors.email && (
          <span style={styles.fieldError}>{validationErrors.email}</span>
        )}
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{...styles.input, ...(validationErrors.password && styles.inputError)}}
          placeholder="Minimum 8 characters"
          required
        />
        {validationErrors.password && (
          <span style={styles.fieldError}>{validationErrors.password}</span>
        )}
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          style={{...styles.input, ...(validationErrors.password_confirmation && styles.inputError)}}
          placeholder="Re-enter your password"
          required
        />
        {validationErrors.password_confirmation && (
          <span style={styles.fieldError}>{validationErrors.password_confirmation}</span>
        )}
      </div>

      <button type="submit" style={styles.button}>
        Create Account
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  errorAlert: {
    padding: "1rem 1.25rem",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "12px",
    border: "1px solid #fecaca",
    fontSize: "0.9375rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "all 0.2s",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  fieldError: {
    color: "#ef4444",
    fontSize: "0.8125rem",
    marginTop: "-0.25rem",
  },
  button: {
    padding: "0.875rem 1.5rem",
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
    transition: "all 0.3s",
  },
};
