# Authentication System - Frontend Implementation

## 🎯 Overview

This frontend implements a complete user registration and approval workflow with role-based access control that integrates with the LogTrack backend.

## 📁 Project Structure

```
src/
├── components/
│   └── auth/
│       ├── LoginForm.jsx          # Login form component
│       ├── RegisterForm.jsx       # Registration form component
│       └── ProtectedRoute.jsx     # Route guard component
├── pages/
│   ├── Login.jsx                  # Login page
│   ├── Register.jsx               # Registration page
│   ├── PendingApproval.jsx        # Pending approval status page
│   ├── AccountRejected.jsx        # Rejected account page
│   └── Unauthorized.jsx           # Unauthorized access page
├── services/
│   ├── api.js                     # API client with interceptors
│   └── authService.js             # Authentication service
├── stores/
│   └── authStore.js               # Auth state management
└── hooks/
    └── useAuth.js                 # Authentication hook
```

## 🚀 Features Implemented

### ✅ User Registration
- Complete registration form with validation
- Email format validation
- Password confirmation matching
- Success message with approval status information
- Error handling for validation and API errors

### ✅ User Login
- Login form with email and password
- Automatic token storage
- Pending approval detection
- Account status validation
- Error handling

### ✅ Token Management
- Automatic token injection in API requests
- Token storage in localStorage
- Automatic cleanup on logout

### ✅ Role-Based Access Control
- Protected routes with role requirements
- Support for single role or multiple allowed roles
- Account status checking (approved/pending/rejected)

### ✅ Status Pages
- Pending Approval page
- Account Rejected page
- Unauthorized Access page

## 📖 Usage Examples

### 1. Using the Register Page

```jsx
// Already implemented in src/pages/Register.jsx
import Register from "./pages/Register";

// Use in your router or app
<Route path="/register" element={<Register />} />
```

### 2. Using the Login Page

```jsx
// Already implemented in src/pages/Login.jsx
import Login from "./pages/Login";

// Use in your router or app
<Route path="/login" element={<Login />} />
```

### 3. Using the useAuth Hook

```jsx
import useAuth from "./hooks/useAuth";

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error,
    login, 
    logout,
    hasRole,
    canAccess,
    isApproved,
    isPending
  } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  // Check user role
  if (hasRole('admin')) {
    return <AdminPanel />;
  }

  // Check multiple roles
  if (canAccess(['admin', 'chef_projet'])) {
    return <ProjectManagement />;
  }

  return <div>Hello {user.name}</div>;
}
```

### 4. Using ProtectedRoute

```jsx
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Protect a route - requires authentication
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Protect with specific role
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>

// Protect with multiple allowed roles
<ProtectedRoute allowedRoles={['admin', 'chef_projet']}>
  <ProjectManagement />
</ProtectedRoute>
```

### 5. Manual Auth Checks in Components

```jsx
import { 
  getCurrentUser, 
  hasRole, 
  canAccess,
  isApproved 
} from "./services/authService";

function MyComponent() {
  const user = getCurrentUser();

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      
      {/* Show admin features only to admins */}
      {hasRole('admin') && (
        <button>Admin Settings</button>
      )}
      
      {/* Show project management to admins and chefs */}
      {canAccess(['admin', 'chef_projet']) && (
        <ProjectManagement />
      )}
      
      {/* Show user status */}
      {!isApproved() && (
        <p>Your account is pending approval</p>
      )}
    </div>
  );
}
```

### 6. Using Auth Service Directly

```jsx
import { login, register, logout } from "./services/authService";

// Register a new user
async function handleRegister(formData) {
  try {
    const response = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordConfirmation
    });
    
    if (response.success) {
      console.log("Registration successful!");
    }
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
}

// Login
async function handleLogin(credentials) {
  try {
    const response = await login(credentials);
    if (response.success) {
      // User is logged in, token is stored automatically
      window.location.href = "/dashboard";
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

// Logout
async function handleLogout() {
  await logout();
  // Automatically redirects to /login
}
```

## 🔑 Available Roles

The system supports four user roles:

1. **admin** - Full system access
   - Manage all users
   - Approve/reject registrations
   - Access all features

2. **chef_projet** - Project Manager
   - Create and manage projects
   - Assign developers to projects
   - View and manage bugs in their projects

3. **developer** - Developer
   - View assigned projects
   - View and update bugs
   - Cannot create/delete projects

4. **client** - Client
   - View their own projects
   - View bugs in their projects
   - Create bug reports

## 🔐 Account Statuses

- **pending** - User registered but not yet approved (cannot login)
- **approved** - User can login and use the system
- **rejected** - User registration was declined (cannot login)

## 🌐 API Configuration

Update your `.env` file with the backend URL:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🎨 Styling

The components use inline styles that match the existing application design. You can customize them by:

1. Creating CSS modules for each component
2. Using the existing App.css styles
3. Adding Tailwind CSS or other CSS frameworks

## ⚡ Quick Start Integration

1. **Add to your App.jsx or main router:**

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApproval from "./pages/PendingApproval";
import AccountRejected from "./pages/AccountRejected";
import Unauthorized from "./pages/Unauthorized";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Status pages */}
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/account-rejected" element={<AccountRejected />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin only route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Multiple roles allowed */}
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'chef_projet']}>
              <Projects />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
```

2. **Initialize auth state on app start:**

```jsx
import { useEffect } from "react";
import { initializeAuth } from "./stores/authStore";

function App() {
  useEffect(() => {
    initializeAuth();
  }, []);
  
  // ... rest of your app
}
```

## 🔒 Security Features

- ✅ Passwords not stored in state or localStorage
- ✅ Tokens automatically removed on logout
- ✅ 401 responses trigger automatic logout
- ✅ 403 responses handled with appropriate messaging
- ✅ Client-side validation before API calls
- ✅ Role checks on protected routes
- ✅ Account status validation

## 🐛 Error Handling

The system handles various error scenarios:

- **Network errors** - User-friendly message
- **401 Unauthorized** - Auto logout and redirect to login
- **403 Forbidden** - Shows pending/rejected status message
- **422 Validation** - Shows specific field errors
- **500 Server errors** - Generic error message

## 📝 Testing

Test the complete flow:

1. **Register:** Go to `/register`, create an account
2. **Try Login:** Should show "pending approval" message
3. **Admin Approval:** Use backend to approve the user
4. **Login:** Should now successfully log in
5. **Access Protected Route:** Navigate to protected pages
6. **Role Check:** Try accessing admin-only pages with non-admin user
7. **Logout:** Verify tokens are cleared

## 🚀 Next Steps

- [ ] Add React Router for proper routing
- [ ] Implement refresh token mechanism
- [ ] Add "Remember Me" functionality
- [ ] Implement password reset flow
- [ ] Add email verification
- [ ] Create admin user management dashboard
- [ ] Add loading states with better UI
- [ ] Implement toast notifications for feedback
- [ ] Add session timeout warnings

## 📧 Support

For issues or questions related to the authentication system, contact the development team.

---

**Status:** ✅ Fully Implemented  
**Last Updated:** February 15, 2026
