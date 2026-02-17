import { useState } from "react";
import { 
  login as loginService, 
  logout as logoutService,
  register as registerService,
} from "../services/authService";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Custom hook for authentication using Zustand
 * @returns {Object} Auth state and methods
 */
export default function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const hasRole = useAuthStore((state) => state.hasRole);
  const canAccess = useAuthStore((state) => state.canAccess);
  const isApproved = useAuthStore((state) => state.isApproved);
  const isPending = useAuthStore((state) => state.isPending);
  const isRejected = useAuthStore((state) => state.isRejected);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Login user
   * @param {Object} credentials - User credentials
   * @returns {Promise<Object>} Login response
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginService(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerService(userData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const handleLogout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutService();
    } catch (err) {
      setError(err.message);
    } finally {
      logout();
      setLoading(false);
      // Redirect to login
      window.location.href = "/login";
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
    hasRole,
    canAccess,
    isApproved: isApproved(),
    isPending: isPending(),
    isRejected: isRejected(),
  };
}

