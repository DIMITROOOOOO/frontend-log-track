import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";
import useAuth from "./hooks/useAuth";

// Layouts
import AuthLayout from "./components/layouts/AuthLayout";
import AppLayout from "./components/layouts/AppLayout";

// Common Components
import NotificationContainer from "./components/common/NotificationContainer";

// Auth Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PendingApproval from "./pages/PendingApproval";
import AccountRejected from "./pages/AccountRejected";
import Unauthorized from "./pages/Unauthorized";

// App Pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";
import Bugs from "./pages/Bugs";
import Reports from "./pages/Reports";
import Team from "./pages/Team";
import Tasks from "./pages/Tasks";

// Admin Pages
import PendingUsers from "./pages/admin/PendingUsers";
import UserList from "./pages/admin/UserList";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./App.css";

function App() {
  const { isAuthenticated, isApproved, isPending, isRejected } = useAuth();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize auth state from localStorage on app load
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <NotificationContainer />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Routes (with AuthLayout) */}
        <Route
          path="/login"
          element={
            isAuthenticated && isApproved ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated && isApproved ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthLayout>
                <Register />
              </AuthLayout>
            )
          }
        />

        {/* Account Status Pages */}
        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/account-rejected" element={<AccountRejected />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected App Routes (with AppLayout) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Projects />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProjectDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Logs />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bugs"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Bugs />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Reports />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Team />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Tasks />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout>
                <UserList />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/pending"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppLayout>
                <PendingUsers />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
