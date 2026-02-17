import { apiRequest } from "./api";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.password_confirmation - Password confirmation
 * @returns {Promise<Object>} Registration response with user data
 */
export async function register(userData) {
  console.log("Registration request data:", {
    name: userData.name,
    email: userData.email,
    password: "***HIDDEN***",
    password_confirmation: "***HIDDEN***"
  });
  
  try {
    const response = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    console.log("Registration response:", response);
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Login response with token and user data
 */
export async function login(credentials) {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.success && response.data) {
    // Store tokens only - user data is managed by Zustand
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
  }

  return response;
}

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export async function logout() {
  try {
    const response = await apiRequest("/auth/logout", { method: "POST" });
    return response;
  } finally {
    // Clear local storage regardless of API response
    clearAuthData();
  }
}

/**
 * Get current user from Zustand store
 * @returns {Object|null} Current user or null
 */
export function getCurrentUser() {
  // User is now managed by Zustand persist
  // This function is kept for backward compatibility
  // Import useAuthStore directly in components instead
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return null;
    const parsed = JSON.parse(authStorage);
    return parsed?.state?.user || null;
  } catch (error) {
    console.error("Error reading auth storage:", error);
    return null;
  }
}

/**
 * Get access token from localStorage
 * @returns {string|null} Access token or null
 */
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

/**
 * Get refresh token from localStorage
 * @returns {string|null} Refresh token or null
 */
export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

/**
 * Clear all authentication data from localStorage
 */
export function clearAuthData() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  // Note: User data is cleared by Zustand store.logout()
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
  return Boolean(getAccessToken() && getCurrentUser());
}

/**
 * Check if user has specific role
 * @param {string} role - Role to check
 * @returns {boolean} True if user has the role
 */
export function hasRole(role) {
  const user = getCurrentUser();
  return user?.role === role;
}

/**
 * Check if user can access based on allowed roles
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean} True if user has one of the allowed roles
 */
export function canAccess(allowedRoles) {
  const user = getCurrentUser();
  return user?.role && allowedRoles.includes(user.role);
}

/**
 * Check if user account is approved
 * @returns {boolean} True if user is approved
 */
export function isApproved() {
  const user = getCurrentUser();
  return user?.account_status === "approved";
}

/**
 * Check if user account is pending
 * @returns {boolean} True if user is pending approval
 */
export function isPending() {
  const user = getCurrentUser();
  return user?.account_status === "pending";
}

/**
 * Check if user account is rejected
 * @returns {boolean} True if user is rejected
 */
export function isRejected() {
  const user = getCurrentUser();
  return user?.account_status === "rejected";
}
