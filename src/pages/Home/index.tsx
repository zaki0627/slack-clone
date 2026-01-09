import WorkspaceSelector from "./WorkspaceSelector";
import "./Home.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { userCurrentuserStore } from "../../modules/auth/current-user.status";
import { Navigate, useParams } from "react-router-dom";
import { Workspace } from "../../modules/workspaces/workspace.entity";
import { useEffect, useState } from "react";
import { WorkspaceRepository } from "../../modules/workspaces/workspace.repository";

function Home() {
  const { currentUser } = userCurrentuserStore();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const params = useParams();
  const { workspaceId } = params;
  const selectedWorkspace = workspaces.find(
    (workspace) => workspace.id == workspaceId
  );
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await WorkspaceRepository.find();
      setWorkspaces(workspaces);
    } catch (error) {
      console.log("workspace find error", error);
    }
  };
  if (currentUser == null) return <Navigate to="signin" />;
  return (
    <div className="slack-container">
      <WorkspaceSelector
        workspaces={workspaces}
        setWorkspaces={setWorkspaces}
        selectedWorkspaceId={workspaceId!}
      />
      {selectedWorkspace != null ? (
        <>
          <Sidebar selectedWorkspace={selectedWorkspace} />
          <MainContent />
        </>
      ) : (
        <div className="sidebar" />
      )}
    </div>
  );
}

export default Home;
