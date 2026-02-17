import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects = [] }) {
  if (projects.length === 0) {
    return <p className="empty-state">No projects yet.</p>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id || project.name} project={project} />
      ))}
    </div>
  );
}
