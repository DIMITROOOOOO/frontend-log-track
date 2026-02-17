# State Management Architecture

This project uses a **hybrid state management approach** optimized for a multi-project log tracking system:

## 🏗️ Architecture Overview

### **TanStack Query (React Query)** - Server State
Handles all data fetching, caching, and synchronization with the backend API.

### **Zustand** - Client/UI State
Manages local UI state, preferences, and auth session.

---

## 📦 State Distribution

### Server State (TanStack Query)
- ✅ Projects list & details
- ✅ Logs (with real-time updates)
- ✅ User management
- ✅ Bug reports
- ✅ Analytics & statistics
- ✅ Team data
- ✅ Tasks

### Client State (Zustand)
- ✅ Authentication & session
- ✅ UI preferences (theme, sidebar)
- ✅ Filter states (logs, bugs)
- ✅ Notifications/toasts
- ✅ Selected project context

---

## 🚀 Usage Examples

### 1. Fetching Projects

```jsx
import { useProjects, useProject } from '../hooks/useProjects';

function ProjectList() {
  // Get all projects with optional filters
  const { data: projects, isLoading, error } = useProjects({ status: 'active' });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectDetail({ projectId }) {
  // Get single project details
  const { data: project, isLoading } = useProject(projectId);

  return <div>{project?.name}</div>;
}
```

### 2. Creating/Updating Projects

```jsx
import { useCreateProject, useUpdateProject } from '../hooks/useProjects';

function CreateProjectForm() {
  const createProject = useCreateProject();

  const handleSubmit = async (formData) => {
    try {
      await createProject.mutateAsync(formData);
      // Auto shows success notification
      // Auto invalidates project list
    } catch (error) {
      // Auto shows error notification
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={createProject.isLoading}>
        {createProject.isLoading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}
```

### 3. Real-time Logs with Auto-refresh

```jsx
import { useLogs, useInfiniteLogs } from '../hooks/useLogs';

function LogsPage({ projectId }) {
  // Auto-refetches every 30 seconds
  const { data: logs, isLoading } = useLogs(projectId, {
    severity: ['error', 'warning'],
    search: 'timeout',
  });

  return <LogTable logs={logs} />;
}

// For infinite scroll
function LogsInfiniteScroll({ projectId }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteLogs(projectId);

  return (
    <div>
      {data.pages.map((page) =>
        page.map((log) => <LogRow key={log.id} log={log} />)
      )}
      {hasNextPage && (
        <button onClick={fetchNextPage} disabled={isFetchingNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}
```

### 4. Admin User Management

```jsx
import { usePendingUsers, useApproveUser } from '../hooks/useAdmin';

function PendingUsersPage() {
  const { data: users, isLoading } = usePendingUsers();
  const approveUser = useApproveUser();

  const handleApprove = async (userId, role) => {
    await approveUser.mutateAsync({ userId, role });
    // Auto shows notification
    // Auto invalidates pending users list
  };

  return (
    <div>
      {users?.map(user => (
        <UserCard 
          key={user.id} 
          user={user}
          onApprove={(role) => handleApprove(user.id, role)}
        />
      ))}
    </div>
  );
}
```

### 5. Using Zustand Stores

```jsx
import { useAuthStore } from '../stores/useAuthStore';
import { useUIStore } from '../stores/useUIStore';
import { useNotificationStore } from '../stores/useNotificationStore';

function Header() {
  // Auth state
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasRole = useAuthStore((state) => state.hasRole);

  // UI state
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const selectedProjectId = useUIStore((state) => state.selectedProjectId);
  const setSelectedProject = useUIStore((state) => state.setSelectedProject);

  // Notifications
  const { success, error } = useNotificationStore();

  const handleAction = async () => {
    try {
      // ... do something
      success('Action completed!');
    } catch (err) {
      error('Action failed!');
    }
  };

  return (/* ... */);
}
```

### 6. Filters with Zustand

```jsx
import { useUIStore } from '../stores/useUIStore';
import { useLogs } from '../hooks/useLogs';

function LogFilters({ projectId }) {
  const logFilters = useUIStore((state) => state.logFilters);
  const setLogFilters = useUIStore((state) => state.setLogFilters);
  const resetFilters = useUIStore((state) => state.resetLogFilters);

  // React Query automatically refetches when filters change
  const { data: logs } = useLogs(projectId, logFilters);

  return (
    <div>
      <input
        value={logFilters.search}
        onChange={(e) => setLogFilters({ search: e.target.value })}
      />
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
}
```

---

## 🔄 Cache Invalidation

Cache is automatically invalidated after mutations. Manual invalidation:

```jsx
import { invalidateQueries } from '../config/queryClient';

// Invalidate all projects
invalidateQueries.projects();

// Invalidate specific project
invalidateQueries.project(projectId);

// Invalidate logs for a project
invalidateQueries.projectLogs(projectId);

// Invalidate all pending users
invalidateQueries.pendingUsers();
```

---

## 🎯 Best Practices

### ✅ DO
- Use React Query for **all server data**
- Use Zustand for **UI state and preferences**
- Let mutations handle notifications automatically
- Use query keys from `queryKeys` factory
- Use `enabled` option to conditionally fetch

### ❌ DON'T
- Don't use useState for server data
- Don't manually refetch (use invalidation)
- Don't create custom query keys (use factory)
- Don't forget to handle loading/error states

---

## ⚙️ Configuration

### Query Client Settings (customizable in `config/queryClient.js`)

```js
staleTime: 30 * 1000,        // Data fresh for 30s
gcTime: 5 * 60 * 1000,       // Cache for 5 minutes
retry: 2,                    // Retry failed requests 2x
refetchOnWindowFocus: true,  // Refetch on tab focus
refetchInterval: 30 * 1000,  // Auto-refetch logs every 30s
```

### Real-time Updates
Logs auto-refresh every 30 seconds. Adjust in hooks:

```js
export function useLogs(projectId, filters) {
  return useQuery({
    // ...
    refetchInterval: 30 * 1000, // Change this value
  });
}
```

---

## 🛠️ DevTools

**React Query DevTools** available in development mode (bottom-right corner):
- View all queries and their states
- Inspect cache data
- Manually trigger refetch
- Monitor network requests

---

## 📊 Performance Benefits

✅ **Automatic caching** - Reduces API calls  
✅ **Request deduplication** - Multiple components use same query  
✅ **Optimistic updates** - Instant UI feedback  
✅ **Background refetching** - Always fresh data  
✅ **Offline support** - Stale-while-revalidate  
✅ **Pagination & infinite scroll** - Built-in  

---

## 🔍 Debugging

```jsx
// Enable verbose logging in development
import { queryClient } from './config/queryClient';

// Log all cache changes
queryClient.getQueryCache().subscribe((event) => {
  console.log('Cache event:', event);
});

// View current cache
console.log(queryClient.getQueryCache().getAll());
```

---

## 📚 Migration from Old Code

Old code using `useState`:
```jsx
const [projects, setProjects] = useState([]);
useEffect(() => {
  fetchProjects().then(setProjects);
}, []);
```

New code with React Query:
```jsx
const { data: projects } = useProjects();
// Handles loading, error, caching, refetching automatically!
```

---

## 🎓 Learn More

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
