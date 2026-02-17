# LogTrack Frontend - Architecture Overview

## 🎯 Project Structure

The application now follows industry best practices with a clean, scalable architecture:

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── LoginForm.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RegisterForm.jsx
│   ├── common/         # Reusable components (role-based)
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Loader.jsx
│   ├── layouts/        # Layout wrappers
│   │   ├── AuthLayout.jsx      # For login/register pages
│   │   └── AppLayout.jsx       # For authenticated app pages
│   └── [feature]/      # Feature-specific components
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx   # Role-based dashboard
│   ├── Projects.jsx
│   ├── Bugs.jsx
│   ├── Tasks.jsx
│   ├── Team.jsx
│   ├── Reports.jsx
│   ├── Settings.jsx
│   └── admin/         # Admin-only pages
│       ├── PendingUsers.jsx
│       └── UserList.jsx
├── services/          # API and business logic
│   ├── api.js
│   ├── authService.js
│   ├── adminService.js
│   ├── projectService.js
│   └── logService.js
├── hooks/             # Custom React hooks
│   └── useAuth.js
├── stores/            # State management
│   ├── authStore.js
│   └── notificationStore.js
├── config/            # Configuration files
│   ├── dashboardConfig.js     # Role-based dashboard configs
│   └── navigationConfig.js    # Role-based navigation items
└── utils/             # Constants and utilities
    └── authConstants.js
```

## 🔐 Authentication Flow

### Registration Process
1. User visits landing page → clicks "Sign Up"
2. Fills registration form → submits
3. Account created with **status: pending**
4. Redirected to "Pending Approval" page
5. Admin approves → user can login
6. Admin rejects → user sees rejection page

### Login Process
1. User enters credentials
2. Backend validates and returns token + user data
3. Token stored in localStorage
4. User redirected based on account status:
   - ✅ **approved** → Dashboard
   - ⏳ **pending** → Pending Approval page
   - ❌ **rejected** → Account Rejected page

## 🎨 Role-Based UI Architecture

### Single Components with Dynamic Content
Instead of creating duplicate components for each role, we use **configuration-based architecture**:

#### Dashboard (pages/Dashboard.jsx)
- Uses `getDashboardConfig(role)` from `config/dashboardConfig.js`
- Shows different stats, quick actions based on role
- Single component, multiple configurations

#### Sidebar (components/common/Sidebar.jsx)
- Uses `getNavigationItems(role)` from `config/navigationConfig.js`
- Different navigation links per role
- Single component, role-based rendering

#### Header (components/common/Header.jsx)
- Displays user info and role-specific actions
- Admins see "Pending Approvals" quick access
- Logout functionality for all users

## 🛣️ Routing Structure

### Public Routes
- `/` - Landing page with login/signup buttons
- `/login` - Login page
- `/register` - Registration page

### Account Status Routes
- `/pending-approval` - For pending users
- `/account-rejected` - For rejected users
- `/unauthorized` - For unauthorized access attempts

### Protected Routes (Require Authentication + Approval)
- `/dashboard` - Role-based dashboard
- `/projects` - Project list
- `/projects/:id` - Project details
- `/logs` - Log viewer
- `/bugs` - Bug tracking
- `/tasks` - Task management
- `/team` - Team management
- `/reports` - Analytics and reports
- `/settings` - User settings

### Admin-Only Routes (Require admin role)
- `/users` - All users list with filtering
- `/users/pending` - Pending approval requests

## 🔑 Role Permissions

### Admin
- Full system access
- User approval/rejection
- View all projects, bugs, reports
- Manage user roles

### Chef Projet (Project Manager)
- Create and manage projects
- Assign team members
- View team reports
- Manage bugs in their projects

### Developer
- View assigned projects
- Complete tasks
- Report and fix bugs
- View personal performance

### Client
- View their own projects
- See project progress
- Provide feedback
- Limited access

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Default Flow
1. Visit `http://localhost:5173/`
2. Click "Sign Up" to create account
3. Wait for admin approval
4. Login after approval
5. Access role-based dashboard

### 4. Testing Admin Features
To test admin features, you'll need to:
1. Register first user
2. Manually approve in database OR
3. Have backend seed an admin user

## 📝 Key Features

### ✅ Implemented
- Complete authentication system
- Role-based access control
- Protected routes with redirects
- Single components with role-based rendering
- Admin user management panel
- Landing page with signup/login
- Account status handling
- Token-based authentication
- Logout functionality

### 🔄 Placeholder Pages (Ready for Implementation)
- Projects list and details
- Bug tracking system
- Task management
- Team collaboration
- Reports and analytics
- Settings panel

## 🎯 Next Steps

1. **Implement actual features** in placeholder pages:
   - Connect Projects.jsx to backend API
   - Build bug tracking functionality
   - Create task management system

2. **Add real-time features**:
   - WebSocket notifications
   - Live updates for pending approvals

3. **Enhance admin panel**:
   - Bulk user actions
   - Advanced filtering
   - User activity logs

4. **Add more role-specific features**:
   - Chef Projet: Team assignment UI
   - Developer: Task board
   - Client: Feedback system

## 💡 Best Practices Used

1. **Single Responsibility**: Each component has one clear purpose
2. **Configuration over Duplication**: Role-based configs instead of duplicate components
3. **Protected Routes**: Security at routing level
4. **Layout Separation**: Auth layout vs App layout
5. **Service Layer**: API calls separated from components
6. **Custom Hooks**: Reusable auth logic
7. **Constants**: Centralized role/status definitions

## 🐛 Troubleshooting

### Users stuck on pending approval
- Check admin can access `/users/pending`
- Verify backend approval endpoint works

### Routes not working
- Ensure `BrowserRouter` is in App.jsx
- Check path definitions match exactly

### Components not showing role-based content
- Verify user role in authStore
- Check role constants match backend

---

**Ready to build! All architecture and routing is complete. Start implementing features!** 🚀
