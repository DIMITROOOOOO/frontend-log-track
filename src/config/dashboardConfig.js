import { USER_ROLES } from "../utils/authConstants";

/**
 * Dashboard configuration for each role
 * @param {string} role - User role
 * @returns {Object} Dashboard configuration
 */
export function getDashboardConfig(role) {
  const configs = {
    [USER_ROLES.ADMIN]: {
      title: "Admin Dashboard",
      subtitle: "System Overview & User Management",
      stats: [
        { label: "Total Users", value: "0", trend: "→", icon: "👥", color: "#3b82f6" },
        { label: "Pending Approvals", value: "0", trend: "→", icon: "⏳", color: "#f59e0b" },
        { label: "Active Projects", value: "0", trend: "→", icon: "📊", color: "#10b981" },
        { label: "Total Bugs", value: "0", trend: "→", icon: "🐛", color: "#ef4444" },
      ],
      quickActions: [
        { 
          id: "approve-users", 
          label: "Approve Users", 
          icon: "✅", 
          path: "/users/pending",
          color: "#10b981"
        },
        { 
          id: "manage-users", 
          label: "Manage Users", 
          icon: "👥", 
          path: "/users",
          color: "#3b82f6"
        },
        { 
          id: "view-projects", 
          label: "All Projects", 
          icon: "📁", 
          path: "/projects",
          color: "#8b5cf6"
        },
        { 
          id: "system-settings", 
          label: "System Settings", 
          icon: "⚙️", 
          path: "/settings",
          color: "#6b7280"
        },
      ],
    },

    [USER_ROLES.CHEF_PROJET]: {
      title: "Project Manager Dashboard",
      subtitle: "Manage Your Projects & Teams",
      stats: [
        { label: "My Projects", value: "0", trend: "→", icon: "📁", color: "#3b82f6" },
        { label: "Team Members", value: "0", trend: "→", icon: "👨‍💻", color: "#10b981" },
        { label: "Open Bugs", value: "0", trend: "→", icon: "🐛", color: "#ef4444" },
        { label: "Completed Tasks", value: "0", trend: "→", icon: "✅", color: "#8b5cf6" },
      ],
      quickActions: [
        { 
          id: "new-project", 
          label: "New Project", 
          icon: "➕", 
          path: "/projects/new",
          color: "#10b981"
        },
        { 
          id: "view-projects", 
          label: "My Projects", 
          icon: "📁", 
          path: "/projects",
          color: "#3b82f6"
        },
        { 
          id: "manage-team", 
          label: "My Team", 
          icon: "👥", 
          path: "/team",
          color: "#8b5cf6"
        },
        { 
          id: "view-reports", 
          label: "Reports", 
          icon: "📊", 
          path: "/reports",
          color: "#f59e0b"
        },
      ],
    },

    [USER_ROLES.DEVELOPER]: {
      title: "Developer Dashboard",
      subtitle: "Your Assigned Tasks & Projects",
      stats: [
        { label: "Assigned Projects", value: "0", trend: "→", icon: "💼", color: "#3b82f6" },
        { label: "Open Tasks", value: "0", trend: "→", icon: "📝", color: "#f59e0b" },
        { label: "Bugs Fixed", value: "0", trend: "→", icon: "🔧", color: "#10b981" },
        { label: "In Progress", value: "0", trend: "→", icon: "⏱️", color: "#8b5cf6" },
      ],
      quickActions: [
        { 
          id: "my-tasks", 
          label: "My Tasks", 
          icon: "📋", 
          path: "/tasks",
          color: "#3b82f6"
        },
        { 
          id: "my-projects", 
          label: "My Projects", 
          icon: "💼", 
          path: "/projects",
          color: "#8b5cf6"
        },
        { 
          id: "my-bugs", 
          label: "My Bugs", 
          icon: "🐛", 
          path: "/bugs",
          color: "#ef4444"
        },
        { 
          id: "time-logs", 
          label: "Time Logs", 
          icon: "⏱️", 
          path: "/time-logs",
          color: "#10b981"
        },
      ],
    },

    [USER_ROLES.CLIENT]: {
      title: "Client Dashboard",
      subtitle: "Track Your Projects & Support",
      stats: [
        { label: "My Projects", value: "0", trend: "→", icon: "📂", color: "#3b82f6" },
        { label: "Open Tickets", value: "0", trend: "→", icon: "🎫", color: "#f59e0b" },
        { label: "Resolved Issues", value: "0", trend: "→", icon: "✅", color: "#10b981" },
        { label: "In Progress", value: "0", trend: "→", icon: "⏱️", color: "#8b5cf6" },
      ],
      quickActions: [
        { 
          id: "report-issue", 
          label: "Report Issue", 
          icon: "🐛", 
          path: "/bugs/new",
          color: "#ef4444"
        },
        { 
          id: "my-projects", 
          label: "My Projects", 
          icon: "📁", 
          path: "/projects",
          color: "#3b82f6"
        },
        { 
          id: "support-tickets", 
          label: "Support Tickets", 
          icon: "🎫", 
          path: "/bugs",
          color: "#f59e0b"
        },
        { 
          id: "documentation", 
          label: "Documentation", 
          icon: "📚", 
          path: "/docs",
          color: "#8b5cf6"
        },
      ],
    },
  };

  return configs[role] || configs[USER_ROLES.DEVELOPER]; // Default fallback
}
