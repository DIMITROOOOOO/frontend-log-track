/**
 * Example App.jsx with Authentication Integration
 * 
 * This file demonstrates how to integrate the authentication system
 * into your application with routing.
 * 
 * To use this:
 * 1. Install react-router-dom: npm install react-router-dom
 * 2. Replace your App.jsx with this file (or adapt your existing one)
 * 3. Update routes according to your needs
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeAuth } from "./stores/authStore";
import useAuth from "./hooks/useAuth";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApproval from "./pages/PendingApproval";
import AccountRejected from "./pages/AccountRejected";
import Unauthorized from "./pages/Unauthorized";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";

function App() {
  const { isAuthenticated, user } = useAuth();

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        {/* Show header and sidebar only when authenticated */}
        {isAuthenticated && (
          <>
            <Header user={user} />
            <Sidebar userRole={user?.role} />
          </>
        )}

        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
            } 
          />

          {/* Status pages */}
          <Route path="/pending-approval" element={<PendingApproval />} />
          <Route path="/account-rejected" element={<AccountRejected />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes - All authenticated users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Protected routes - Admin and Chef de Projet */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute allowedRoles={["admin", "chef_projet"]}>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "chef_projet", "developer"]}>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />

          {/* Protected routes - Admin only */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminRoutes />
              </ProtectedRoute>
            }
          />

          {/* Logs - All authenticated users can view */}
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/**
 * Admin sub-routes
 */
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/users/pending" element={<PendingUsers />} />
      <Route path="/settings" element={<AdminSettings />} />
    </Routes>
  );
}

/**
 * 404 Page
 */
function NotFound() {
  return (
    <main className="page" style={{ textAlign: "center", padding: "3rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/" style={{ color: "#007bff" }}>Go Home</a>
    </main>
  );
}

/**
 * Placeholder components - replace with your actual components
 */
function AdminDashboard() {
  return <div>Admin Dashboard</div>;
}

function UserManagement() {
  return <div>User Management</div>;
}

function PendingUsers() {
  return <div>Pending Users</div>;
}

function AdminSettings() {
  return <div>Admin Settings</div>;
}

export default App;
