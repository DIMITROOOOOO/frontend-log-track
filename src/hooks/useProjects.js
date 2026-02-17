import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys, invalidateQueries } from '../config/queryClient';
import { useNotificationStore } from '../stores/useNotificationStore';
import * as projectService from '../services/projectService';

/**
 * Hook to fetch all projects list
 * @param {Object} filters - Optional filters
 */
export function useProjects(filters = {}) {
  return useQuery({
    queryKey: queryKeys.projects.list(filters),
    queryFn: () => projectService.getProjects(filters),
    select: (response) => response.data || [],
    onError: (error) => {
      useNotificationStore.getState().error(
        error.message || 'Failed to load projects'
      );
    },
  });
}

/**
 * Hook to fetch single project details
 * @param {string|number} projectId
 */
export function useProject(projectId) {
  return useQuery({
    queryKey: queryKeys.projects.detail(projectId),
    queryFn: () => projectService.getProject(projectId),
    select: (response) => response.data,
    enabled: Boolean(projectId),
    onError: (error) => {
      useNotificationStore.getState().error(
        error.message || 'Failed to load project'
      );
    },
  });
}

/**
 * Hook to fetch project statistics
 * @param {string|number} projectId
 */
export function useProjectStats(projectId) {
  return useQuery({
    queryKey: queryKeys.projects.stats(projectId),
    queryFn: () => projectService.getProjectStats(projectId),
    select: (response) => response.data,
    enabled: Boolean(projectId),
    staleTime: 60 * 1000, // Stats can be cached for 1 minute
  });
}

/**
 * Hook to create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: (projectData) => projectService.createProject(projectData),
    onSuccess: (response) => {
      invalidateQueries.projects();
      success('Project created successfully!');
      return response.data;
    },
    onError: (err) => {
      error(err.message || 'Failed to create project');
    },
  });
}

/**
 * Hook to update a project
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: ({ projectId, data }) => projectService.updateProject(projectId, data),
    onSuccess: (response, variables) => {
      // Invalidate specific project and list
      invalidateQueries.project(variables.projectId);
      invalidateQueries.projects();
      success('Project updated successfully!');
      return response.data;
    },
    onError: (err) => {
      error(err.message || 'Failed to update project');
    },
  });
}

/**
 * Hook to delete a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { success, error } = useNotificationStore();

  return useMutation({
    mutationFn: (projectId) => projectService.deleteProject(projectId),
    onSuccess: () => {
      invalidateQueries.projects();
      success('Project deleted successfully!');
    },
    onError: (err) => {
      error(err.message || 'Failed to delete project');
    },
  });
}

// Default export for backward compatibility
export default function useProjectsLegacy() {
  const { data: projects = [], isLoading } = useProjects();
  
  return {
    projects,
    isLoading,
    setProjects: () => {
      console.warn('setProjects is deprecated. Use React Query mutations instead.');
    },
    addProject: () => {
      console.warn('addProject is deprecated. Use useCreateProject hook instead.');
    },
  };
}
