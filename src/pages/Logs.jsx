import { useLogs } from "../hooks/useLogs";
import { useUIStore } from "../stores/useUIStore";
import LogFilter from "../components/logs/LogFilter";
import LogTable from "../components/logs/LogTable";
import LogChart from "../components/logs/LogChart";
import Loader from "../components/common/Loader";

export default function Logs() {
  const selectedProjectId = useUIStore(state => state.selectedProject);
  const logFilters = useUIStore(state => state.logFilters);
  
  const { data: logs = [], isLoading } = useLogs(selectedProjectId, logFilters);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page logs-page">
      <h1>Logs</h1>
      <LogFilter />
      <LogChart data={logs} />
      <LogTable logs={logs} />
    </main>
  );
}
