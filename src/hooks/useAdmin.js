import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '../config/queryClient';
import { useNotificationStore } from '../stores/useNotificationStore';
import * as adminService from '../services/adminService';

/**
 * Hook to fetch all users (admin only)
 * @param {Object} filters - Optional filters
 */
export function useUsers(filters = {}) {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => adminService.getAllUsers(filters),
    select: (response) => response.data || [],
    // Keep previous data while fetching new filter results
    placeholderData: (previousData) => previousData,
    // Users change less frequently than logs
    staleTime: 2 * 60 * 1000, // 2 minutes
    onError: (error) => {
      useNotificationStore.getState().error(
        error.message || 'Failed to load users'
      );
    },
  });
}

/**
 * Hook to fetch pending users awaiting approval
 */
export function usePendingUsers() {
  return useQuery({
    queryKey: queryKeys.users.pending(),
    queryFn: () => adminService.getPendingUsers(),
    select: (response) => response.data || [],
    // Auto-refetch every 30 seconds for new registrations
    refetchInterval: 30 * 1000,
    onError: (error) => {
      useNotificationStore.getState().error(
        error.message || 'Failed to load pending users'
      );
    },
  });
}

/**
 * Hook to fetch single user details
 * @param {string|number} userId
 */
export function useUser(userId) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => adminService.getUser(userId),
    select: (response) => response.data,
    enabled: Boolean(userId),
  });
}

/**
 * Hook to approve a pending user
 */
export function useApproveUser() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: ({ userId, role }) => adminService.approveUser(userId, role),
    onSuccess: () => {
      invalidateQueries.users();
      invalidateQueries.pendingUsers();
      success('User approved successfully!');
    },
    onError: (err) => {
      error(err.message || 'Failed to approve user');
    },
  });
}

/**
 * Hook to reject a pending user
 */
export function useRejectUser() {
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: ({ userId, reason }) => adminService.rejectUser(userId, reason),
    onSuccess: () => {
      invalidateQueries.users();
      invalidateQueries.pendingUsers();
      success('User rejected successfully');
    },
    onError: (err) => {
      error(err.message || 'Failed to reject user');
    },
  });
}

/**
 * Hook to update user role with optimistic updates
 */
export function useUpdateUserRole() {
  const { success, error } = useNotificationStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }) => adminService.updateUserRole(userId, role),
    // Optimistic update - instant UI feedback
    onMutate: async ({ userId, role }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.users.all });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueriesData({ queryKey: queryKeys.users.all });

      // Optimistically update all user list queries
      queryClient.setQueriesData({ queryKey: queryKeys.users.all }, (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((user) =>
            user.id === userId ? { ...user, role } : user
          ),
        };
      });

      return { previousUsers };
    },
    onSuccess: () => {
      success('User role updated successfully!');
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        context.previousUsers.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      error(err.message || 'Failed to update user role');
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

/**
 * Hook to delete a user with optimistic updates
 */
export function useDeleteUser() {
  const { success, error } = useNotificationStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => adminService.deleteUser(userId),
    // Optimistic delete
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.all });

      const previousUsers = queryClient.getQueriesData({ queryKey: queryKeys.users.all });

      // Remove user from cache immediately
      queryClient.setQueriesData({ queryKey: queryKeys.users.all }, (old) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((user) => user.id !== userId),
        };
      });

      return { previousUsers };
    },
    onSuccess: () => {
      success('User deleted successfully!');
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        context.previousUsers.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      error(err.message || 'Failed to delete user');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
