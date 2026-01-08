import "../Signup/auth.css";
import CreateWorkspaceModal from "../Home/WorkspaceSelector/CreateWorkspaceModal";
import { userCurrentuserStore } from "../../modules/auth/current-user.status";
import { Navigate } from "react-router-dom";
function CreateWorkspace() {
  const { currentUser } = userCurrentuserStore();
  if (currentUser == null) return <Navigate to="signin" />;

  return (
    <div>
      <CreateWorkspaceModal />
    </div>
  );
}

export default CreateWorkspace;
