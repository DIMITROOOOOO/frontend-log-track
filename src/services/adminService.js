import { apiRequest } from "./api";

/**
 * Admin Service - Functions for admin-only operations
 * All functions require admin authentication
 */

/**
 * Get all users with optional filters
 * @param {Object} filters - Optional filters
 * @param {string} filters.role - Filter by role
 * @param {string} filters.account_status - Filter by account status
 * @returns {Promise<Object>} List of users
 */
export async function getAllUsers(filters = {}) {
  const params = new URLSearchParams();
  
  if (filters.role) {
    params.append("role", filters.role);
  }
  
  if (filters.account_status) {
    params.append("account_status", filters.account_status);
  }
  
  const queryString = params.toString();
  const endpoint = `/admin/users${queryString ? `?${queryString}` : ""}`;
  
  return apiRequest(endpoint);
}

/**
 * Get pending users awaiting approval
 * @returns {Promise<Object>} List of pending users
 */
export async function getPendingUsers() {
  return apiRequest("/admin/users/pending");
}

/**
 * Approve a user and assign role
 * @param {number} userId - User ID to approve
 * @param {string} role - Role to assign (admin, chef_projet, developer, client)
 * @returns {Promise<Object>} Approval response
 */
export async function approveUser(userId, role) {
  return apiRequest(`/admin/users/${userId}/approve`, {
    method: "POST",
    body: JSON.stringify({ role }),
  });
}

/**
 * Reject a user registration
 * @param {number} userId - User ID to reject
 * @param {string} reason - Rejection reason (optional)
 * @returns {Promise<Object>} Rejection response
 */
export async function rejectUser(userId, reason = "") {
  return apiRequest(`/admin/users/${userId}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

/**
 * Update user role
 * @param {number} userId - User ID
 * @param {string} newRole - New role to assign
 * @returns {Promise<Object>} Update response
 */
export async function updateUserRole(userId, newRole) {
  return apiRequest(`/admin/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role: newRole }),
  });
}

/**
 * Delete a user
 * @param {number} userId - User ID to delete
 * @returns {Promise<Object>} Deletion response
 */
export async function deleteUser(userId) {
  return apiRequest(`/admin/users/${userId}`, {
    method: "DELETE",
  });
}

/**
 * Get user statistics
 * @returns {Promise<Object>} User statistics
 */
export async function getUserStats() {
  return apiRequest("/admin/users/stats");
}

/**
 * Batch approve users
 * @param {Array<{userId: number, role: string}>} users - Array of users to approve
 * @returns {Promise<Object>} Batch approval response
 */
export async function batchApproveUsers(users) {
  return apiRequest("/admin/users/batch-approve", {
    method: "POST",
    body: JSON.stringify({ users }),
  });
}

/**
 * Search users by name or email
 * @param {string} query - Search query
 * @returns {Promise<Object>} Search results
 */
export async function searchUsers(query) {
  return apiRequest(`/admin/users/search?q=${encodeURIComponent(query)}`);
}

/**
 * Get user details by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User details
 */
export async function getUserById(userId) {
  return apiRequest(`/admin/users/${userId}`);
}

/**
 * Bulk operations helper
 * Approve multiple users at once
 */
export async function bulkApprove(userIds, role) {
  const promises = userIds.map((id) => approveUser(id, role));
  return Promise.allSettled(promises);
}

/**
 * Bulk operations helper
 * Reject multiple users at once
 */
export async function bulkReject(userIds, reason) {
  const promises = userIds.map((id) => rejectUser(id, reason));
  return Promise.allSettled(promises);
}

/**
 * Bulk operations helper
 * Delete multiple users at once
 */
export async function bulkDelete(userIds) {
  const promises = userIds.map((id) => deleteUser(id));
  return Promise.allSettled(promises);
}
