import { USER_ROLES } from "../utils/authConstants";

/**
 * Navigation items for each role
 * @param {string} role - User role
 * @returns {Array} Navigation items
 */
export function getNavigationItems(role) {
  const commonItems = [
    { 
      path: "/dashboard", 
      label: "Dashboard", 
      icon: "🏠",
      exact: true
    },
  ];

  const roleItems = {
    [USER_ROLES.ADMIN]: [
      { 
        path: "/users", 
        label: "User Management", 
        icon: "👥"
      },
      { 
        path: "/users/pending", 
        label: "Pending Approvals", 
        icon: "⏳",
        badge: 0 // Will be updated dynamically
      },
      { 
        path: "/projects", 
        label: "All Projects", 
        icon: "📊"
      },
      { 
        path: "/bugs", 
        label: "All Bugs", 
        icon: "🐛"
      },
      { 
        path: "/reports", 
        label: "Reports", 
        icon: "📈"
      },
      { 
        path: "/settings", 
        label: "Settings", 
        icon: "⚙️"
      },
    ],

    [USER_ROLES.CHEF_PROJET]: [
      { 
        path: "/projects", 
        label: "My Projects", 
        icon: "📁"
      },
      { 
        path: "/projects/new", 
        label: "New Project", 
        icon: "➕"
      },
      { 
        path: "/team", 
        label: "My Team", 
        icon: "👥"
      },
      { 
        path: "/bugs", 
        label: "Bugs", 
        icon: "🐛"
      },
      { 
        path: "/reports", 
        label: "Reports", 
        icon: "📊"
      },
      { 
        path: "/settings", 
        label: "Settings", 
        icon: "⚙️"
      },
    ],

    [USER_ROLES.DEVELOPER]: [
      { 
        path: "/projects", 
        label: "My Projects", 
        icon: "💼"
      },
      { 
        path: "/tasks", 
        label: "My Tasks", 
        icon: "📋"
      },
      { 
        path: "/bugs", 
        label: "Bugs", 
        icon: "🐛"
      },
      { 
        path: "/time-logs", 
        label: "Time Tracking", 
        icon: "⏱️"
      },
      { 
        path: "/settings", 
        label: "Settings", 
        icon: "⚙️"
      },
    ],

    [USER_ROLES.CLIENT]: [
      { 
        path: "/projects", 
        label: "My Projects", 
        icon: "📂"
      },
      { 
        path: "/bugs", 
        label: "Support Tickets", 
        icon: "🎫"
      },
      { 
        path: "/bugs/new", 
        label: "Report Issue", 
        icon: "🐛"
      },
      { 
        path: "/docs", 
        label: "Documentation", 
        icon: "📚"
      },
      { 
        path: "/settings", 
        label: "Settings", 
        icon: "⚙️"
      },
    ],
  };

  return [...commonItems, ...(roleItems[role] || [])];
}
