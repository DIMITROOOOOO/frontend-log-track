/**
 * Examples of Role-Based UI Components
 * 
 * This file demonstrates various patterns for implementing
 * role-based UI in your components.
 */

import { getCurrentUser, hasRole, canAccess } from "../services/authService";
import { USER_ROLES, ROLE_LABELS } from "../utils/authConstants";

/**
 * Example 1: Role-Based Navigation Menu
 */
export function NavigationMenu() {
  const user = getCurrentUser();

  return (
    <nav>
      <ul>
        {/* All authenticated users can see Dashboard */}
        <li><a href="/dashboard">Dashboard</a></li>

        {/* Admin and Chef Projet can see Projects */}
        {canAccess([USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET]) && (
          <li><a href="/projects">Projects</a></li>
        )}

        {/* Only Admin can see User Management */}
        {hasRole(USER_ROLES.ADMIN) && (
          <li><a href="/admin/users">User Management</a></li>
        )}

        {/* All users can see their assigned items */}
        <li><a href="/logs">Logs</a></li>

        {/* Developer and Chef can see bugs */}
        {canAccess([USER_ROLES.DEVELOPER, USER_ROLES.CHEF_PROJET, USER_ROLES.ADMIN]) && (
          <li><a href="/bugs">Bugs</a></li>
        )}

        {/* All users can see settings */}
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  );
}

/**
 * Example 2: Conditional Action Buttons
 */
export function ProjectActions({ project }) {
  return (
    <div className="project-actions">
      {/* All users can view */}
      <button>View Details</button>

      {/* Only Admin and Chef Projet can edit */}
      {canAccess([USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET]) && (
        <>
          <button>Edit Project</button>
          <button>Assign Developer</button>
        </>
      )}

      {/* Only Admin can delete */}
      {hasRole(USER_ROLES.ADMIN) && (
        <button className="danger">Delete Project</button>
      )}
    </div>
  );
}

/**
 * Example 3: Role-Based Dashboard Widgets
 */
export function DashboardWidgets() {
  const user = getCurrentUser();

  return (
    <div className="dashboard-widgets">
      {/* Admin sees everything */}
      {hasRole(USER_ROLES.ADMIN) && (
        <>
          <UserStatsWidget />
          <SystemHealthWidget />
          <AllProjectsWidget />
          <PendingApprovalsWidget />
        </>
      )}

      {/* Chef Projet sees their projects */}
      {hasRole(USER_ROLES.CHEF_PROJET) && (
        <>
          <MyProjectsWidget />
          <TeamMembersWidget />
          <ProjectStatsWidget />
        </>
      )}

      {/* Developer sees assigned work */}
      {hasRole(USER_ROLES.DEVELOPER) && (
        <>
          <AssignedProjectsWidget />
          <MyBugsWidget />
          <TasksWidget />
        </>
      )}

      {/* Client sees their projects */}
      {hasRole(USER_ROLES.CLIENT) && (
        <>
          <ClientProjectsWidget />
          <ClientBugsWidget />
        </>
      )}

      {/* All users see their activity */}
      <RecentActivityWidget userId={user?.id} />
    </div>
  );
}

/**
 * Example 4: User Profile with Role Badge
 */
export function UserProfile() {
  const user = getCurrentUser();

  if (!user) return null;

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return "#dc3545";
      case USER_ROLES.CHEF_PROJET:
        return "#007bff";
      case USER_ROLES.DEVELOPER:
        return "#28a745";
      case USER_ROLES.CLIENT:
        return "#6c757d";
      default:
        return "#6c757d";
    }
  };

  return (
    <div className="user-profile">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-email">{user.email}</div>
        <span
          className="role-badge"
          style={{
            backgroundColor: getRoleBadgeColor(user.role),
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "500",
          }}
        >
          {ROLE_LABELS[user.role]}
        </span>
      </div>
    </div>
  );
}

/**
 * Example 5: Conditional Form Fields
 */
export function ProjectForm({ project, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Project Name" required />
      <textarea name="description" placeholder="Description" required />

      {/* Only Admin and Chef can set priority */}
      {canAccess([USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET]) && (
        <select name="priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      )}

      {/* Only Admin can set visibility */}
      {hasRole(USER_ROLES.ADMIN) && (
        <select name="visibility">
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      )}

      <button type="submit">
        {canAccess([USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET])
          ? "Save Project"
          : "Submit for Review"}
      </button>
    </form>
  );
}

/**
 * Example 6: Role-Based Data Table
 */
export function UsersTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          {hasRole(USER_ROLES.ADMIN) && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{ROLE_LABELS[user.role]}</td>
            <td>{user.account_status}</td>
            {hasRole(USER_ROLES.ADMIN) && (
              <td>
                <button>Edit</button>
                <button>Change Role</button>
                <button className="danger">Delete</button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Example 7: Using useAuth Hook in Component
 */
export function MyComponent() {
  const {
    user,
    isAuthenticated,
    hasRole: checkRole,
    canAccess: checkAccess,
    logout,
  } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>You are logged in as: {ROLE_LABELS[user.role]}</p>

      {checkRole(USER_ROLES.ADMIN) && (
        <div className="admin-notice">
          You have administrator privileges
        </div>
      )}

      {checkAccess([USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET]) && (
        <button>Manage Projects</button>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

/**
 * Example 8: Wrapper Component for Role-Based Rendering
 */
export function RoleGuard({ children, roles, fallback = null }) {
  if (!roles) return children; // No role restriction

  if (Array.isArray(roles)) {
    // Multiple roles allowed
    return canAccess(roles) ? children : fallback;
  } else {
    // Single role required
    return hasRole(roles) ? children : fallback;
  }
}

// Usage example:
function ExampleUsage() {
  return (
    <div>
      <RoleGuard roles={USER_ROLES.ADMIN}>
        <AdminPanel />
      </RoleGuard>

      <RoleGuard roles={[USER_ROLES.ADMIN, USER_ROLES.CHEF_PROJET]}>
        <ProjectManagement />
      </RoleGuard>

      <RoleGuard
        roles={USER_ROLES.DEVELOPER}
        fallback={<p>Developers only</p>}
      >
        <DeveloperTools />
      </RoleGuard>
    </div>
  );
}

/**
 * Placeholder components for examples
 */
function UserStatsWidget() {
  return <div>User Stats</div>;
}
function SystemHealthWidget() {
  return <div>System Health</div>;
}
function AllProjectsWidget() {
  return <div>All Projects</div>;
}
function PendingApprovalsWidget() {
  return <div>Pending Approvals</div>;
}
function MyProjectsWidget() {
  return <div>My Projects</div>;
}
function TeamMembersWidget() {
  return <div>Team Members</div>;
}
function ProjectStatsWidget() {
  return <div>Project Stats</div>;
}
function AssignedProjectsWidget() {
  return <div>Assigned Projects</div>;
}
function MyBugsWidget() {
  return <div>My Bugs</div>;
}
function TasksWidget() {
  return <div>Tasks</div>;
}
function ClientProjectsWidget() {
  return <div>Client Projects</div>;
}
function ClientBugsWidget() {
  return <div>Client Bugs</div>;
}
function RecentActivityWidget() {
  return <div>Recent Activity</div>;
}
function AdminPanel() {
  return <div>Admin Panel</div>;
}
function ProjectManagement() {
  return <div>Project Management</div>;
}
function DeveloperTools() {
  return <div>Developer Tools</div>;
}
