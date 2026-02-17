import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentUser } from '../services/authService';

/**
 * Auth store using Zustand
 * Persisted to localStorage for session management
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      
      // Actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: Boolean(user) 
      }),
      
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
      
      login: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),
      
      logout: () => {
        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Clear state
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      // Initialize from localStorage (sync with tokens)
      initialize: () => {
        const token = localStorage.getItem('access_token');
        const currentState = get();
        
        // If we have a token but no user, or no token but have a user, clear the state
        if (!token && currentState.user) {
          set({ user: null, isAuthenticated: false });
        } else if (token && currentState.user) {
          set({ isAuthenticated: true });
        }
      },
      
      // Helper selectors
      getUser: () => get().user,
      hasRole: (role) => get().user?.role === role,
      canAccess: (allowedRoles) => {
        const userRole = get().user?.role;
        return userRole && allowedRoles.includes(userRole);
      },
      isApproved: () => get().user?.account_status === 'approved',
      isPending: () => get().user?.account_status === 'pending',
      isRejected: () => get().user?.account_status === 'rejected',
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

// Backward compatibility exports for gradual migration
export const getAuthState = () => useAuthStore.getState();
export const setAuthState = (nextState) => useAuthStore.setState(nextState);
export const clearAuthState = () => useAuthStore.getState().logout();
export const subscribeAuth = (listener) => useAuthStore.subscribe(listener);
