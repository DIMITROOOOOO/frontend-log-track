import Header from "../common/Header";
import Sidebar from "../common/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />
      
      <div style={styles.mainContent}>
        <Header />
        
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9fafb",
  },
  mainContent: {
    flex: 1,
    marginLeft: "280px",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    overflow: "auto",
  },
};
