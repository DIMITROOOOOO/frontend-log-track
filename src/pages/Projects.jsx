import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectList from "../components/projects/ProjectList";
import CreateProjectModal from "../components/projects/CreateProjectModal";
import Loader from "../components/common/Loader";

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: projects = [], isLoading } = useProjects();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page projects-page">
      <h1>Projects</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Project</button>
      <ProjectList projects={projects} />
      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
