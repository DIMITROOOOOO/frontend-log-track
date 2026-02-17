import { QueryClient } from '@tanstack/react-query';

/**
 * Configure React Query client for optimal performance
 * Tailored for multi-project log tracking system
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data considered fresh for 30 seconds (good for log updates)
      staleTime: 30 * 1000,
      
      // Cache data for 5 minutes
      gcTime: 5 * 60 * 1000,
      
      // Retry failed requests 2 times
      retry: 2,
      
      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus for real-time updates
      refetchOnWindowFocus: true,
      
      // Don't refetch on mount if data is fresh
      refetchOnMount: false,
      
      // Refetch on reconnect for offline support
      refetchOnReconnect: true,
      
      // Enable network mode for better offline handling
      networkMode: 'online',
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      
      // Network mode for mutations
      networkMode: 'online',
    },
  },
});

/**
 * Query keys factory for consistent cache key generation
 * This ensures proper cache invalidation across the app
 */
export const queryKeys = {
  // Auth queries
  auth: {
    me: ['auth', 'me'],
  },
  
  // Projects queries
  projects: {
    all: ['projects'],
    list: (filters) => ['projects', 'list', filters],
    detail: (id) => ['projects', 'detail', id],
    stats: (id) => ['projects', 'stats', id],
  },
  
  // Logs queries
  logs: {
    all: ['logs'],
    list: (projectId, filters) => ['logs', 'list', projectId, filters],
    detail: (id) => ['logs', 'detail', id],
    stats: (projectId) => ['logs', 'stats', projectId],
  },
  
  // Users queries (admin)
  users: {
    all: ['users'],
    list: (filters) => ['users', 'list', filters],
    pending: () => ['users', 'pending'],
    detail: (id) => ['users', 'detail', id],
  },
  
  // Reports queries
  reports: {
    all: ['reports'],
    list: (filters) => ['reports', 'list', filters],
    detail: (id) => ['reports', 'detail', id],
  },
  
  // Tasks queries
  tasks: {
    all: ['tasks'],
    list: (filters) => ['tasks', 'list', filters],
    detail: (id) => ['tasks', 'detail', id],
    byProject: (projectId) => ['tasks', 'project', projectId],
  },
  
  // Team queries
  team: {
    all: ['team'],
    list: () => ['team', 'list'],
    members: (projectId) => ['team', 'members', projectId],
    detail: (id) => ['team', 'detail', id],
  },
  
  // Bugs queries
  bugs: {
    all: ['bugs'],
    list: (projectId, filters) => ['bugs', 'list', projectId, filters],
    detail: (id) => ['bugs', 'detail', id],
    stats: (projectId) => ['bugs', 'stats', projectId],
  },
};

/**
 * Query invalidation helpers
 * Use these to invalidate related queries after mutations
 */
export const invalidateQueries = {
  // Invalidate all project-related queries
  projects: () => queryClient.invalidateQueries({ queryKey: queryKeys.projects.all }),
  
  // Invalidate specific project
  project: (id) => queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) }),
  
  // Invalidate all logs
  logs: () => queryClient.invalidateQueries({ queryKey: queryKeys.logs.all }),
  
  // Invalidate logs for specific project
  projectLogs: (projectId) => queryClient.invalidateQueries({ 
    queryKey: ['logs', 'list', projectId] 
  }),
  
  // Invalidate user lists
  users: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
  
  // Invalidate pending users
  pendingUsers: () => queryClient.invalidateQueries({ queryKey: queryKeys.users.pending() }),
  
  // Invalidate bugs
  bugs: () => queryClient.invalidateQueries({ queryKey: queryKeys.bugs.all }),
  
  // Invalidate project bugs
  projectBugs: (projectId) => queryClient.invalidateQueries({ 
    queryKey: ['bugs', 'list', projectId] 
  }),
  
  // Invalidate all data (use sparingly)
  all: () => queryClient.invalidateQueries(),
};

/**
 * Prefetch helpers for better UX
 */
export const prefetchQueries = {
  // Prefetch project details when hovering over project card
  project: (id) => queryClient.prefetchQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => import('../services/projectService').then(m => m.getProject(id)),
    staleTime: 60 * 1000, // 1 minute
  }),
  
  // Prefetch logs when navigating to project
  projectLogs: (projectId) => queryClient.prefetchQuery({
    queryKey: queryKeys.logs.list(projectId, {}),
    queryFn: () => import('../services/logService').then(m => m.getLogs(projectId)),
    staleTime: 30 * 1000, // 30 seconds
  }),
};
