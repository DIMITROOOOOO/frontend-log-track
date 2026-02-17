# Migration Guide: Upgrading to TanStack Query + Zustand

This guide helps you migrate existing components to the new state management system.

## 📋 Quick Checklist

- [ ] Add NotificationContainer to App.jsx
- [ ] Update admin pages to use new hooks
- [ ] Replace old stores imports
- [ ] Test all mutations show notifications
- [ ] Verify DevTools are working

---

## 🔄 Step-by-Step Migration

### 1. Add NotificationContainer

Update your `App.jsx` or main layout to include notifications:

```jsx
import NotificationContainer from './components/common/NotificationContainer';

function App() {
  return (
    <>
      <NotificationContainer />
      {/* Your existing app structure */}
    </>
  );
}
```

### 2. Update Admin Pages

**Before (PendingUsers.jsx):**
```jsx
import { getPendingUsers, approveUser } from "../services/adminService";

function PendingUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getPendingUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId, role) => {
    await approveUser(userId, role);
    fetchUsers(); // Manual refetch
  };
}
```

**After (PendingUsers.jsx):**
```jsx
import { usePendingUsers, useApproveUser } from "../hooks/useAdmin";

function PendingUsers() {
  const { data: users, isLoading } = usePendingUsers();
  const approveUser = useApproveUser();

  const handleApprove = async (userId, role) => {
    await approveUser.mutateAsync({ userId, role });
    // Auto refetches! Auto shows notification!
  };
  
  if (isLoading) return <Loader />;
}
```

### 3. Update Project Components

**Before:**
```jsx
import { getProjects } from "../services/projectService";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    getProjects().then(res => setProjects(res.data));
  }, []);
}
```

**After:**
```jsx
import { useProjects } from "../hooks/useProjects";

function ProjectList() {
  const { data: projects, isLoading } = useProjects();
  
  if (isLoading) return <Loader />;
}
```

### 4. Update Log Components

**Before:**
```jsx
function LogsPage({ projectId }) {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    getLogs(projectId, filters).then(res => setLogs(res.data));
  }, [projectId, filters]);
}
```

**After:**
```jsx
import { useLogs } from "../hooks/useLogs";
import { useUIStore } from "../stores/useUIStore";

function LogsPage({ projectId }) {
  const logFilters = useUIStore(state => state.logFilters);
  const { data: logs, isLoading } = useLogs(projectId, logFilters);
  // Auto-refetches every 30 seconds!
  // No need for manual useEffect!
}
```

### 5. Update Auth Store Usage

**Before:**
```jsx
import { getAuthState, setAuthState } from "../stores/authStore";

const state = getAuthState();
setAuthState({ user: newUser });
```

**After:**
```jsx
import { useAuthStore } from "../stores/useAuthStore";

const user = useAuthStore(state => state.user);
const setUser = useAuthStore(state => state.setUser);
setUser(newUser);
```

### 6. Update Notification Usage

**Before:**
```jsx
import { pushNotification } from "../stores/notificationStore";

pushNotification({ type: 'success', message: 'Done!' });
```

**After:**
```jsx
import { useNotificationStore } from "../stores/useNotificationStore";

const { success, error } = useNotificationStore();

success('Done!'); // Simpler!
error('Failed!');
```

---

## 🎯 Common Patterns

### Pattern 1: List + Create

```jsx
import { useProjects, useCreateProject } from '../hooks/useProjects';

function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();

  const handleCreate = async (data) => {
    try {
      await createProject.mutateAsync(data);
      // Auto notification + refetch!
    } catch (error) {
      // Error already shown
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : <ProjectList projects={projects} />}
      <CreateForm onSubmit={handleCreate} loading={createProject.isLoading} />
    </>
  );
}
```

### Pattern 2: Detail + Update

```jsx
import { useProject, useUpdateProject } from '../hooks/useProjects';

function ProjectDetail({ projectId }) {
  const { data: project, isLoading } = useProject(projectId);
  const updateProject = useUpdateProject();

  const handleUpdate = async (updates) => {
    await updateProject.mutateAsync({ projectId, data: updates });
  };

  if (isLoading) return <Loader />;

  return <ProjectForm project={project} onSubmit={handleUpdate} />;
}
```

### Pattern 3: Filters with UI Store

```jsx
import { useUIStore } from '../stores/useUIStore';
import { useLogs } from '../hooks/useLogs';

function LogFilters({ projectId }) {
  const logFilters = useUIStore(state => state.logFilters);
  const setLogFilters = useUIStore(state => state.setLogFilters);
  const resetFilters = useUIStore(state => state.resetLogFilters);

  const { data: logs } = useLogs(projectId, logFilters);

  return (
    <>
      <input
        value={logFilters.search}
        onChange={e => setLogFilters({ search: e.target.value })}
      />
      <FilterDropdown
        value={logFilters.severity}
        onChange={severity => setLogFilters({ severity })}
      />
      <button onClick={resetFilters}>Clear</button>
      <LogTable logs={logs} />
    </>
  );
}
```

---

## ✅ Files to Update

### High Priority
1. ✅ `src/pages/admin/PendingUsers.jsx` - Use `usePendingUsers`, `useApproveUser`, `useRejectUser`
2. ✅ `src/pages/admin/UserList.jsx` - Use `useUsers`, `useUpdateUserRole`, `useDeleteUser`
3. ✅ `src/pages/Projects.jsx` - Use `useProjects`, `useCreateProject`
4. ✅ `src/pages/ProjectDetail.jsx` - Use `useProject`, `useUpdateProject`
5. ✅ `src/pages/Logs.jsx` - Use `useLogs` with filters
6. ✅ `src/App.jsx` - Add `<NotificationContainer />`

### Medium Priority
7. `src/components/dashboard/StatCards.jsx` - Use query stats
8. `src/components/dashboard/RecentActivity.jsx` - Use recent logs query
9. Any component using old `useProjects()` or `useLogs()`

### Low Priority
10. Legacy compatibility - Keep old stores for gradual migration

---

## 🔍 Testing Checklist

After migration, verify:

- [ ] DevTools show queries (bottom-right corner)
- [ ] Notifications appear on success/error
- [ ] Mutations invalidate cache (lists update)
- [ ] Filters work without manual refetch
- [ ] Real-time updates refresh every 30s
- [ ] No console warnings about deprecated functions
- [ ] Loading states work correctly
- [ ] Error handling shows notifications

---

## 🐛 Common Issues

### Issue: "Cannot read property 'data' of undefined"
**Solution:** Check if you're using optional chaining:
```jsx
const { data: projects = [] } = useProjects(); // ✅
const { data: projects } = useProjects(); // ❌ might be undefined
```

### Issue: Mutations not updating UI
**Solution:** Check if query invalidation is working:
```jsx
import { invalidateQueries } from '../config/queryClient';
// After mutation:
invalidateQueries.projects();
```

### Issue: Notifications not showing
**Solution:** Make sure NotificationContainer is rendered:
```jsx
// In App.jsx or AppLayout
<NotificationContainer />
```

### Issue: Zustand state not persisting
**Solution:** Check localStorage key and partialize config in store definition

---

## 📚 Additional Resources

- See `STATE_MANAGEMENT.md` for full documentation
- Check hooks in `src/hooks/` for usage examples
- Inspect stores in `src/stores/` for available actions
- Use React Query DevTools for debugging
