import { getCurrentUser, isApproved, canAccess } from "../../services/authService";

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string} [props.requiredRole] - Specific role required to access
 * @param {string[]} [props.allowedRoles] - Array of roles allowed to access
 * @param {React.ReactNode} [props.fallback] - Component to render if unauthorized
 * @returns {React.ReactNode}
 */
export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  allowedRoles, 
  fallback = null 
}) {
  const user = getCurrentUser();
  const token = localStorage.getItem("access_token");

  // Check if user is authenticated
  if (!token || !user) {
    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return fallback;
  }

  // Check if account is approved
  if (!isApproved()) {
    // Redirect based on account status
    if (user.account_status === "pending") {
      if (typeof window !== "undefined") {
        window.location.href = "/pending-approval";
      }
      return fallback;
    }
    
    if (user.account_status === "rejected") {
      if (typeof window !== "undefined") {
        window.location.href = "/account-rejected";
      }
      return fallback;
    }
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized";
    }
    return fallback;
  }

  // Check if user has one of the allowed roles
  if (allowedRoles && !canAccess(allowedRoles)) {
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized";
    }
    return fallback;
  }

  // User is authorized
  return children;
}

