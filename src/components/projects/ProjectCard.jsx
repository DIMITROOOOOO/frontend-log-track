export default function ProjectCard({ project }) {
  if (!project) {
    return null;
  }

  return (
    <article className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="project-card__meta">
        <span>Status: {project.status || "unknown"}</span>
        <span>Logs: {project.logCount ?? 0}</span>
      </div>
    </article>
  );
}
