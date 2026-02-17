import { getCurrentUser } from "../services/authService";

const listeners = new Set();

// Initialize state from localStorage
let state = {
  user: getCurrentUser(),
  isAuthenticated: Boolean(localStorage.getItem("access_token") && getCurrentUser()),
};

/**
 * Get current auth state
 * @returns {Object} Current auth state
 */
export function getAuthState() {
  return state;
}

/**
 * Update auth state and notify listeners
 * @param {Object} nextState - New state to merge
 */
export function setAuthState(nextState) {
  state = { ...state, ...nextState };
  listeners.forEach((listener) => listener(state));
}

/**
 * Subscribe to auth state changes
 * @param {Function} listener - Callback function to be called on state change
 * @returns {Function} Unsubscribe function
 */
export function subscribeAuth(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Initialize auth state from localStorage
 * Should be called on app startup
 */
export function initializeAuth() {
  const user = getCurrentUser();
  const token = localStorage.getItem("access_token");
  
  setAuthState({
    user,
    isAuthenticated: Boolean(token && user),
  });
}

/**
 * Clear auth state
 */
export function clearAuthState() {
  setAuthState({
    user: null,
    isAuthenticated: false,
  });
}
