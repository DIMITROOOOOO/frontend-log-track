import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '../config/queryClient';
import { useNotificationStore } from '../stores/useNotificationStore';
import * as logService from '../services/logService';

/**
 * Hook to fetch logs for a specific project
 * @param {string|number} projectId
 * @param {Object} filters - Optional filters (severity, dateRange, search)
 */
export function useLogs(projectId, filters = {}) {
  return useQuery({
    queryKey: queryKeys.logs.list(projectId, filters),
    queryFn: () => logService.getLogs(projectId, filters),
    select: (response) => response.data || [],
    enabled: Boolean(projectId),
    // Refetch every 30 seconds for real-time log updates
    refetchInterval: 30 * 1000,
    onError: (error) => {
      useNotificationStore.getState().error(
        error.message || 'Failed to load logs'
      );
    },
  });
}

/**
 * Hook for infinite scroll logs
 * Perfect for log streaming and pagination
 * @param {string|number} projectId
 * @param {Object} filters
 */
export function useInfiniteLogs(projectId, filters = {}) {
  return useInfiniteQuery({
    queryKey: ['logs', 'infinite', projectId, filters],
    queryFn: ({ pageParam = 1 }) => 
      logService.getLogs(projectId, { ...filters, page: pageParam }),
    select: (data) => ({
      pages: data.pages.map(page => page.data || []),
      pageParams: data.pageParams,
    }),
    getNextPageParam: (lastPage, pages) => {
      // Assuming API returns hasMore or nextPage
      return lastPage.meta?.hasMore ? pages.length + 1 : undefined;
    },
    enabled: Boolean(projectId),
    // Auto-refetch for real-time updates
    refetchInterval: 30 * 1000,
  });
}

/**
 * Hook to fetch single log details
 * @param {string|number} logId
 */
export function useLog(logId) {
  return useQuery({
    queryKey: queryKeys.logs.detail(logId),
    queryFn: () => logService.getLog(logId),
    select: (response) => response.data,
    enabled: Boolean(logId),
  });
}

/**
 * Hook to fetch log statistics for a project
 * @param {string|number} projectId
 */
export function useLogStats(projectId) {
  return useQuery({
    queryKey: queryKeys.logs.stats(projectId),
    queryFn: () => logService.getLogStats(projectId),
    select: (response) => response.data,
    enabled: Boolean(projectId),
    staleTime: 60 * 1000, // Cache stats for 1 minute
  });
}

/**
 * Hook to create a new log entry
 */
export function useCreateLog() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: ({ projectId, logData }) => logService.createLog(projectId, logData),
    onSuccess: (response, variables) => {
      invalidateQueries.projectLogs(variables.projectId);
      invalidateQueries.logs();
      success('Log created successfully!');
      return response.data;
    },
    onError: (err) => {
      error(err.message || 'Failed to create log');
    },
  });
}

/**
 * Hook to update a log entry
 */
export function useUpdateLog() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: ({ logId, data }) => logService.updateLog(logId, data),
    onSuccess: (response, variables) => {
      invalidateQueries.logs();
      success('Log updated successfully!');
      return response.data;
    },
    onError: (err) => {
      error(err.message || 'Failed to update log');
    },
  });
}

/**
 * Hook to delete a log entry
 */
export function useDeleteLog() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: (logId) => logService.deleteLog(logId),
    onSuccess: () => {
      invalidateQueries.logs();
      success('Log deleted successfully!');
    },
    onError: (err) => {
      error(err.message || 'Failed to delete log');
    },
  });
}

/**
 * Hook for bulk operations on logs
 */
export function useBulkDeleteLogs() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: (logIds) => logService.bulkDeleteLogs(logIds),
    onSuccess: () => {
      invalidateQueries.logs();
      success('Logs deleted successfully!');
    },
    onError: (err) => {
      error(err.message || 'Failed to delete logs');
    },
  });
}

// Default export for backward compatibility
export default function useLogsLegacy() {
  const { success } = useNotificationStore();
  
  return {
    logs: [],
    setLogs: () => {
      console.warn('setLogs is deprecated. Use React Query instead.');
    },
    addLog: () => {
      console.warn('addLog is deprecated. Use useCreateLog hook instead.');
    },
  };
}
