// Authentication utility constants

/**
 * User roles in the system
 */
export const USER_ROLES = {
  ADMIN: "admin",
  CHEF_PROJET: "chef_projet",
  DEVELOPER: "developer",
  CLIENT: "client",
};

/**
 * Account statuses
 */
export const ACCOUNT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

/**
 * User role display names
 */
export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: "Administrator",
  [USER_ROLES.CHEF_PROJET]: "Project Manager",
  [USER_ROLES.DEVELOPER]: "Developer",
  [USER_ROLES.CLIENT]: "Client",
};

/**
 * Account status display messages
 */
export const STATUS_MESSAGES = {
  [ACCOUNT_STATUS.PENDING]: "Your account is pending admin approval",
  [ACCOUNT_STATUS.APPROVED]: "Your account is active",
  [ACCOUNT_STATUS.REJECTED]: "Your account has been rejected",
};

/**
 * Role-based route permissions
 * Define which roles can access which routes
 */
export const ROUTE_PERMISSIONS = {
  "/dashboard": [
    USER_ROLES.ADMIN,
    USER_ROLES.CHEF_PROJET,
    USER_ROLES.DEVELOPER,
    USER_ROLES.CLIENT,
  ],
  "/admin": [USER_ROLES.ADMIN],
  "/projects": [USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET],
  "/projects/create": [USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET],
  "/bugs": [
    USER_ROLES.ADMIN,
    USER_ROLES.CHEF_PROJET,
    USER_ROLES.DEVELOPER,
    USER_ROLES.CLIENT,
  ],
  "/settings": [
    USER_ROLES.ADMIN,
    USER_ROLES.CHEF_PROJET,
    USER_ROLES.DEVELOPER,
    USER_ROLES.CLIENT,
  ],
};
