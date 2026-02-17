import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI state store using Zustand
 * Manages client-side UI preferences and state
 */
export const useUIStore = create(
  persist(
    (set) => ({
      // Sidebar state
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ 
        sidebarCollapsed: !state.sidebarCollapsed 
      })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      
      // Current selected project (for multi-project context)
      selectedProjectId: null,
      setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
      
      // Filter states
      logFilters: {
        severity: [],
        dateRange: null,
        search: '',
      },
      setLogFilters: (filters) => set((state) => ({
        logFilters: { ...state.logFilters, ...filters },
      })),
      resetLogFilters: () => set({
        logFilters: {
          severity: [],
          dateRange: null,
          search: '',
        },
      }),
      
      bugFilters: {
        status: [],
        priority: [],
        assignee: null,
        search: '',
      },
      setBugFilters: (filters) => set((state) => ({
        bugFilters: { ...state.bugFilters, ...filters },
      })),
      resetBugFilters: () => set({
        bugFilters: {
          status: [],
          priority: [],
          assignee: null,
          search: '',
        },
      }),
      
      // Theme preference
      theme: 'light', // light, dark, system
      setTheme: (theme) => set({ theme }),
      
      // View preferences
      logViewMode: 'table', // table, grid, timeline
      setLogViewMode: (mode) => set({ logViewMode: mode }),
      
      // Pagination settings
      pageSize: 20,
      setPageSize: (size) => set({ pageSize: size }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        logViewMode: state.logViewMode,
        pageSize: state.pageSize,
      }),
    }
  )
);
