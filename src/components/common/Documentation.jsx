const authEndpoints = [
  {
    method: "POST",
    path: "/api/auth/register",
    description: "Register a new user account",
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Login and receive authentication token",
  },
  {
    method: "POST",
    path: "/api/auth/logout",
    description: "Logout current user",
  },
  {
    method: "GET",
    path: "/api/user",
    description: "Get authenticated user information",
  },
];

const projectEndpoints = [
  {
    method: "GET",
    path: "/api/projects",
    description: "Get all projects for authenticated user",
  },
  {
    method: "POST",
    path: "/api/projects",
    description: "Create a new project",
  },
  {
    method: "GET",
    path: "/api/projects/{id}",
    description: "Get specific project details",
  },
  {
    method: "PUT",
    path: "/api/projects/{id}",
    description: "Update project information",
  },
  {
    method: "DELETE",
    path: "/api/projects/{id}",
    description: "Delete a project",
  },
];

const logEndpoints = [
  {
    method: "GET",
    path: "/api/projects/{project_id}/logs",
    description: "Get logs for a specific project",
  },
  {
    method: "POST",
    path: "/api/projects/{project_id}/logs",
    description: "Submit new log entries",
  },
  {
    method: "GET",
    path: "/api/logs/{id}",
    description: "Get specific log entry details",
  },
  {
    method: "POST",
    path: "/api/projects/{project_id}/logs/batch",
    description: "Submit multiple log entries at once",
  },
];

const analysisEndpoints = [
  {
    method: "POST",
    path: "/api/projects/{project_id}/analyze",
    description: "Run AI analysis on project logs",
  },
  {
    method: "GET",
    path: "/api/projects/{project_id}/insights",
    description: "Get AI-generated insights and patterns",
  },
  {
    method: "GET",
    path: "/api/projects/{project_id}/stats",
    description: "Get log statistics and metrics",
  },
];

const configEndpoints = [
  {
    method: "GET",
    path: "/api/projects/{project_id}/config",
    description: "Get log configuration for project",
  },
  {
    method: "PUT",
    path: "/api/projects/{project_id}/config",
    description: "Update log configuration",
  },
];

const features = [
  "Real-time log tracking and monitoring",
  "AI-powered log analysis and insights",
  "Project-based log organization",
  "Advanced filtering and search capabilities",
  "Customizable log retention policies",
  "Alert and notification system",
  "Statistical analysis and reporting",
  "Batch log submission",
  "Multi-user project collaboration",
];

function EndpointList({ title, items }) {
  return (
    <section className="doc-section">
      <h3>{title}</h3>
      <ul className="doc-list">
        {items.map((item) => (
          <li key={`${item.method}-${item.path}`}>
            <span className={`method method--${item.method.toLowerCase()}`}>
              {item.method}
            </span>
            <span className="endpoint-path">{item.path}</span>
            <span className="endpoint-desc">{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Documentation() {
  return (
    <section className="documentation">
      <header className="doc-header">
        <h2>Backend Guide</h2>
        <p>
          Base URL: <span className="inline-code">http://localhost:8000</span>
          <span className="divider" />
          API Prefix: <span className="inline-code">/api</span>
        </p>
      </header>
      <div className="doc-grid">
        <EndpointList title="Authentication" items={authEndpoints} />
        <EndpointList title="Projects" items={projectEndpoints} />
        <EndpointList title="Logs" items={logEndpoints} />
        <EndpointList title="Analysis" items={analysisEndpoints} />
        <EndpointList title="Configuration" items={configEndpoints} />
      </div>
      <section className="doc-section">
        <h3>Core Features</h3>
        <ul className="doc-tags">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}
