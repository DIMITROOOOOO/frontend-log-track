export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Make an API request with automatic token injection and error handling
 * @param {string} path - API endpoint path
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export async function apiRequest(path, options = {}) {
  // Get access token from localStorage
  const token = localStorage.getItem("access_token");
  
  // Build headers with authorization if token exists
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers,
      ...options,
    });

    // Handle different error status codes
    if (!response.ok) {
      // Try to parse error response
      let errorData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        const errorText = await response.text();
        errorData = { message: errorText || "Request failed" };
      }

      // Log error details for debugging
      console.error(`API Error [${response.status}]:`, {
        url: `${API_BASE_URL}${path}`,
        status: response.status,
        statusText: response.statusText,
        errorData
      });

      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Unauthorized - token expired or invalid
          handleUnauthorized();
          throw new Error(errorData.message || "Unauthorized. Please log in again.");
        
        case 403:
          // Forbidden - account pending or insufficient permissions
          throw new ForbiddenError(errorData.message || "Access forbidden", errorData);
        
        case 422:
          // Validation error
          throw new ValidationError(errorData.message || "Validation failed", errorData);
        
        case 500:
          // Server error - provide helpful message
          throw new Error(
            errorData.message || 
            "Server error occurred. Please check if the backend is running correctly."
          );
        
        default:
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
    }

    // Parse and return JSON response
    return response.json();
  } catch (error) {
    // Re-throw custom errors
    if (error instanceof ForbiddenError || error instanceof ValidationError) {
      throw error;
    }
    
    // Handle network errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error("Network error. Please check your connection.");
    }
    
    // Re-throw other errors
    throw error;
  }
}

/**
 * Handle unauthorized responses by clearing auth data
 */
function handleUnauthorized() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  
  // Redirect to login page if not already there
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

/**
 * Custom error for 403 Forbidden responses
 */
export class ForbiddenError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "ForbiddenError";
    this.data = data;
  }
}

/**
 * Custom error for 422 Validation responses
 */
export class ValidationError extends Error {
  constructor(message, data) {
    super(message);
    this.name = "ValidationError";
    this.data = data;
    this.errors = data?.errors || {};
  }
}
