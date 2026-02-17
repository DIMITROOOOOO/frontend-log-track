# 🚀 Quick Start Guide - Authentication System

## ⚡ 5-Minute Setup

### Step 1: Configure Environment

Create `.env` file in your project root:

```env
VITE_API_URL=http://localhost:8000/api
```

### Step 2: Initialize Auth on App Start

Update your `main.jsx` or `App.jsx`:

```jsx
import { useEffect } from "react";
import { initializeAuth } from "./stores/authStore";

function App() {
  useEffect(() => {
    initializeAuth(); // Load user from localStorage
  }, []);

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
```

### Step 3: Use the Pages

```jsx
// Import the pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Use them in your app (or router)
<Login />        // User can login here
<Register />     // User can register here
<Dashboard />    // Protected page
```

---

## 📖 Common Usage Patterns

### Pattern 1: Protected Page

```jsx
import ProtectedRoute from "./components/auth/ProtectedRoute";

function MyPage() {
  return (
    <ProtectedRoute>
      <YourComponent />
    </ProtectedRoute>
  );
}
```

### Pattern 2: Admin-Only Page

```jsx
import ProtectedRoute from "./components/auth/ProtectedRoute";

function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  );
}
```

### Pattern 3: Multiple Roles Allowed

```jsx
import ProtectedRoute from "./components/auth/ProtectedRoute";

function ProjectsPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'chef_projet']}>
      <ProjectManagement />
    </ProtectedRoute>
  );
}
```

### Pattern 4: Show/Hide UI Based on Role

```jsx
import useAuth from "./hooks/useAuth";

function MyComponent() {
  const { user, hasRole, canAccess } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      
      {/* Show to admins only */}
      {hasRole('admin') && (
        <button>Admin Settings</button>
      )}
      
      {/* Show to admins and project managers */}
      {canAccess(['admin', 'chef_projet']) && (
        <button>Manage Projects</button>
      )}
    </div>
  );
}
```

### Pattern 5: Get Current User Info

```jsx
import { getCurrentUser } from "./services/authService";

function UserProfile() {
  const user = getCurrentUser();
  
  return (
    <div>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Status: {user?.account_status}</p>
    </div>
  );
}
```

### Pattern 6: Logout Button

```jsx
import useAuth from "./hooks/useAuth";

function LogoutButton() {
  const { logout } = useAuth();
  
  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
```

---

## 🎯 Testing the Flow

### 1. Test Registration

```bash
# Navigate to registration page
http://localhost:5173/register

# Fill in:
- Name: John Doe
- Email: john@example.com
- Password: Password123
- Confirm: Password123

# Click "Create Account"
# You should see success message
```

### 2. Test Login Before Approval

```bash
# Navigate to login page
http://localhost:5173/login

# Try logging in with the new account
# You should see "pending approval" message
```

### 3. Approve User (Backend)

```bash
# Login as admin
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@logtrack.com","password":"Admin@123"}'

# Copy the access_token from response

# Approve the user
curl -X POST http://localhost:8000/api/admin/users/{USER_ID}/approve \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"developer"}'
```

### 4. Test Login After Approval

```bash
# Navigate to login page
http://localhost:5173/login

# Login with approved account
# Should successfully login and redirect to dashboard
```

---

## 🔐 Available User Roles

| Role | Key | Permissions |
|------|-----|-------------|
| Administrator | `admin` | Full system access |
| Project Manager | `chef_projet` | Manage projects, assign developers |
| Developer | `developer` | View assigned projects and bugs |
| Client | `client` | View own projects only |

---

## 📱 API Request Examples

### Make Authenticated Request

```jsx
import { apiRequest } from "./services/api";

// Token is automatically included
async function getProjects() {
  try {
    const response = await apiRequest("/projects");
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}
```

### Handle Specific Errors

```jsx
import { apiRequest, ForbiddenError, ValidationError } from "./services/api";

async function createProject(data) {
  try {
    const response = await apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    if (error instanceof ForbiddenError) {
      alert("You don't have permission to create projects");
    } else if (error instanceof ValidationError) {
      console.log("Validation errors:", error.errors);
    } else {
      alert(error.message);
    }
  }
}
```

---

## 🎨 Customization Tips

### Change API URL

Edit `.env` file:
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Customize Redirect After Login

Edit `src/pages/Login.jsx`:
```jsx
if (response.success && response.data) {
  window.location.href = "/your-custom-page";
}
```

### Add Custom Styling

The components use inline styles. To customize:

1. Create a CSS file for the component
2. Import it in the component
3. Replace inline styles with classNames

Example:
```jsx
// Before
<div style={{ padding: "1rem" }}>...</div>

// After
<div className="my-custom-class">...</div>
```

---

## 🐛 Common Issues & Solutions

### Issue: "Network error" when making requests

**Solution:** Check your `.env` file and make sure `VITE_API_URL` is correct.

```bash
# Restart dev server after changing .env
npm run dev
```

### Issue: User stays logged in after token expires

**Solution:** The API automatically handles 401 errors and logs out the user. Make sure your backend returns 401 for expired tokens.

### Issue: Role checks not working

**Solution:** Make sure the role string matches exactly (case-sensitive):
```jsx
// Correct
hasRole('admin')
hasRole('chef_projet')

// Wrong
hasRole('Admin')
hasRole('Chef_Projet')
```

### Issue: "Cannot read property 'role' of null"

**Solution:** User is not logged in. Always check if user exists:
```jsx
const user = getCurrentUser();
if (!user) return;

// Or use optional chaining
user?.role
```

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `authService.js` | Login, register, logout, role checks |
| `api.js` | HTTP client with token handling |
| `authStore.js` | State management |
| `useAuth.js` | React hook for auth |
| `ProtectedRoute.jsx` | Route guard component |
| `LoginForm.jsx` | Login form |
| `RegisterForm.jsx` | Registration form |
| `Login.jsx` | Login page |
| `Register.jsx` | Registration page |

---

## ✅ Next Steps Checklist

- [ ] Configure `.env` with your API URL
- [ ] Add `initializeAuth()` to your app startup
- [ ] Test registration flow
- [ ] Test login flow  
- [ ] Test role-based access
- [ ] Add protected routes to your app
- [ ] Customize styling to match your design
- [ ] Add toast notifications (optional)
- [ ] Implement password reset (optional)
- [ ] Add "Remember Me" feature (optional)

---

## 🆘 Need Help?

1. **Check the docs:** See `AUTH_IMPLEMENTATION.md` for detailed guide
2. **See examples:** Check `APP_EXAMPLE_WITH_AUTH.jsx` and `ROLE_BASED_UI_EXAMPLES.jsx`
3. **Review the code:** All functions have JSDoc comments
4. **Test the API:** Use the backend documentation

---

## 🎉 You're All Set!

Your authentication system is ready to use. Start by testing the registration and login flow, then integrate the protected routes into your application.

**Happy coding!** 🚀
