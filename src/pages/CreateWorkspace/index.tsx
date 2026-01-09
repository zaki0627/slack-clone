import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { userCurrentuserStore } from "../../modules/auth/current-user.status";
import { Navigate, useNavigate } from "react-router-dom";
import { WorkspaceRepository } from "../../modules/workspaces/workspace.repository";
import { useEffect, useState } from "react";
import { Workspace } from "../../modules/workspaces/workspace.entity";
function CreateWorkspace() {
  const { currentUser } = userCurrentuserStore();
  const navigate = useNavigate();
  const [homeWorkspace, setHomeWorkspace] = useState<Workspace>();
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const workspaces = await WorkspaceRepository.find();
      setHomeWorkspace(workspaces[0]);
    } catch (error) {
      console.log("workspaces find failed");
    } finally {
      setIsloading(false);
    }
  };

  const createWorkspace = async (name: string) => {
    try {
      const newWorkspace = await WorkspaceRepository.create(name);
      navigate(`/${newWorkspace.id}/${newWorkspace.channels[0].id}`);
    } catch {
      console.error("error");
    }
  };
  if (isLoading) return <div>aaaaaaaa</div>;
  if (currentUser == null) return <Navigate to="signin" />;
  if (homeWorkspace != null)
    return (
      <Navigate to={`/${homeWorkspace.id}/${homeWorkspace.channels[0].id}`} />
    );

  return (
    <div>
      <CreateWorkspaceModal onSubmit={createWorkspace} />
    </div>
  );
}

export default CreateWorkspace;
