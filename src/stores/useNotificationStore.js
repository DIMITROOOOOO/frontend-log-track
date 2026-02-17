import { create } from 'zustand';

/**
 * Notification store using Zustand
 * Manages toast notifications and alerts across the app
 */
export const useNotificationStore = create((set, get) => ({
  // State
  notifications: [],
  
  // Actions
  addNotification: (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info', // info, success, warning, error
      message: '',
      duration: 5000, // auto-dismiss after 5s
      ...notification,
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
    
    // Auto-dismiss
    if (newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  },
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter((n) => n.id !== id),
  })),
  
  clearAll: () => set({ notifications: [] }),
  
  // Convenience methods
  success: (message, options = {}) => 
    get().addNotification({ type: 'success', message, ...options }),
  
  error: (message, options = {}) => 
    get().addNotification({ type: 'error', message, duration: 8000, ...options }),
  
  warning: (message, options = {}) => 
    get().addNotification({ type: 'warning', message, ...options }),
  
  info: (message, options = {}) => 
    get().addNotification({ type: 'info', message, ...options }),
}));

// Backward compatibility
export const pushNotification = (notification) => 
  useNotificationStore.getState().addNotification(notification);

export const getNotificationState = () => ({
  notifications: useNotificationStore.getState().notifications,
});

export const subscribeNotifications = (listener) => 
  useNotificationStore.subscribe(listener);
