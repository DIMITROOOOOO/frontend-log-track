export default function ProjectDetails({ project }) {
  if (!project) {
    return <p className="empty-state">Select a project to view details.</p>;
  }

  return (
    <section className="project-details">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{project.status || "unknown"}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{project.owner || "-"}</dd>
        </div>
        <div>
          <dt>Logs</dt>
          <dd>{project.logCount ?? 0}</dd>
        </div>
      </dl>
    </section>
  );
}
