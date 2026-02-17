import { useParams } from "react-router-dom";
import { useProject } from "../hooks/useProjects";
import ProjectDetails from "../components/projects/ProjectDetails";
import Loader from "../components/common/Loader";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page project-detail-page">
      <ProjectDetails project={project} />
    </main>
  );
}
